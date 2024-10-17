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
				where: { id_user: Idcar },
			});
			resolve(data);
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
};
