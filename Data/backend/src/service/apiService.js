import { raw } from "mysql2";
import db from "../models/index";
import { where } from "sequelize";
import { response } from "express";
import { getAllUser } from "../service/userService";
require("dotenv").config();

let CreateNewCar = (data, user) => {
	return new Promise(async (resolve, reject) => {
		try {
			let cars = Array.isArray(data) ? data : [data];
			for (let i = 0; i < cars.length; i++) {
				let car = cars[i];
				let check = await CheckLicensePlate(car.license_plate);
				if (check === true) {
					resolve({
						errCode: 1,
						errMessage: "Your License Plate has exist",
					});
				} else {
					let User = await getAllUser(user.id);
					await db.Car.create({
						//(value my sql): (value name-html)
						name: car.name,
						license_plate: car.license_plate,
						type: car.type,
						id_user: User.id,
					});
				}
			}
			resolve({
				errCode: 0,
				message: "Create success",
			});
		} catch (e) {
			reject(e);
		}
	});
};

let GetAllCar = (Idcar) => {
	return new Promise(async (resolve, reject) => {
		try {
			let iduser = Array.isArray(Idcar) ? Idcar : Idcar.split(",");
			let allCar = [];
			for (let i = 0; i < iduser.length; i++) {
				let data = await db.Car.findAll({
					attributes: [
						"id_car",
						"name",
						"license_plate",
						"type",
						"inTime",
						"outTime",
						"id_user",
						"id_reservation",
						"createdAt",
						"updatedAt",
					],
					where: { id_user: iduser[i] },
					include: [
						{
							model: db.Reservation,
							attributes: ["type", "price"],
						},
					],
				});
				let data_noReservation = await db.Car.findAll({
					where: { id_user: iduser[i], id_reservation: null },
				});
				for (let car of data) {
					let payment = await db.Payment.findAll({
						where: { id_car: car.id_car },
						attributes: ["paymentDate"],
					});
					if (payment.length > 0) {
						allCar.push({
							...car.toJSON(),
							paymentDate: payment[0].paymentDate,
						});
					}
				}
				allCar = allCar.concat(data_noReservation);
			}
			resolve(allCar);
		} catch (e) {
			reject(e);
		}
	});
};
let GetCar_Ticket = (id_user) => {
	return new Promise(async (resolve, reject) => {
		try {
			let iduser = Array.isArray(id_user) ? id_user : id_user.split(",");
			let allCar = [];
			for (let i = 0; i < iduser.length; i++) {
				let data = await db.Car.findAll({
					attributes: [
						"id_car",
						"name",
						"license_plate",
						"type",
						"inTime",
						"outTime",
						"id_user",
						"id_reservation",
						"createdAt",
						"updatedAt",
					],
					where: {
						id_user: iduser[i],
						id_reservation: { [db.Sequelize.Op.ne]: null },
					},
					include: [
						{
							model: db.Reservation,
							attributes: ["type", "price"],
						},
					],
				});
				for (let car of data) {
					let payment = await db.Payment.findAll({
						where: { id_car: car.id_car },
						attributes: ["paymentDate"],
					});
					if (payment.length > 0) {
						allCar.push({
							...car.toJSON(),
							paymentDate: payment[0].paymentDate,
						});
					}
				}
			}
			resolve(allCar);
		} catch (e) {
			reject(e);
		}
	});
};
let DeleteTicket = (id_car) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log("id", id_car);
			let payment = await db.Payment.findOne({
				where: { id_car: id_car },
			});
			if (payment) {
				await db.Payment.destroy({
					where: { id_car: id_car },
				});
				await db.Car.update(
					{ id_reservation: null },
					{ where: { id_car: id_car } }
				);
				resolve({
					errCode: 0,
					message: `The Ticket is deleted`,
				});
			} else {
				resolve({
					errCode: 2,
					errMessage: `The Ticket isn't exist`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
let DeleteCar = (User_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let car = await db.Car.findOne({
				where: { id_user: User_id },
			});
			if (car) {
				await db.Car.destroy({
					where: { id_user: User_id },
				});
				resolve({
					errCode: 0,
					message: `The User is deleted`,
				});
			} else {
				resolve({
					errCode: 2,
					errMessage: `The car isn't exist`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
let GetTicketType = (typeTicket) => {
	return new Promise(async (resolve, reject) => {
		try {
			let ticket = await db.Reservation.findOne({
				where: { type: typeTicket },
			});
			resolve(ticket);
		} catch (e) {
			reject(e);
		}
	});
};
const formatDateForDatabase = (dateString) => {
	const [day, month, year] = dateString.split("/");
	return `${year}-${month}-${day}`;
};
let CreatePayment = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let date = formatDateForDatabase(data.paymentDate);
			let currentDate = new Date();
			let car_account = await db.Car.findOne({
				where: { license_plate: data.licenseplate },
			});
			let reservation = await db.Reservation.findOne({
				where: { type: data.type },
			});
			if (!car_account) {
				return resolve({
					errCode: 1,
					errMessage: "Car not found.",
				});
			}
			let payment = await db.Payment.findOne({
				where: { id_car: car_account.id_car },
			});
			if (payment) {
				let paymentDate = new Date(payment.paymentDate);
				if (paymentDate >= currentDate) {
					return resolve({
						errCode: 2,
						errMessage: "Payment is still valid, cannot create a new ticket.",
					});
				} else {
					await db.Payment.update(
						{
							amount: data.price,
							paymentDate: date,
							id_car: car_account.id_car,
						},
						{ where: { id_payment: payment.id_payment } }
					);
					resolve({
						errCode: 0,
						errMessage: "Ticket updated successfully.",
					});
				}
			} else {
				if (reservation) {
					await db.Payment.create({
						amount: data.price,
						paymentDate: date,
						id_car: car_account.id_car,
					});
					await db.Car.update(
						{ id_reservation: reservation.id_reservation },
						{ where: { id_car: car_account.id_car } }
					);
					resolve({
						errCode: 0,
						errMessage: "Ticket created successfully.",
					});
				} else {
					resolve({
						errCode: 1,
						errMessage: "Missing required reservation information!",
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};
let CheckLicensePlate = (LicensePlate) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await db.Car.findOne({
				attributes: [
					"id_car",
					"name",
					"license_plate",
					"type",
					"inTime",
					"outTime",
					"id_user",
					"id_reservation",
					"createdAt",
					"updatedAt",
				],
				where: { license_plate: LicensePlate },
			});
			if (data) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	CreateNewCar,
	GetAllCar,
	DeleteCar,
	DeleteTicket,
	GetTicketType,
	CreatePayment,
	GetCar_Ticket,
};
