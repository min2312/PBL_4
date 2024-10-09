import { raw } from "mysql2";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { where } from "sequelize";
import { response } from "express";
import { CreateJWT } from "../middleware/JWT_Action";
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
let HandleUserLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = {};
			let isExist = await CheckUserEmail(email);
			if (isExist) {
				let user = await db.User.findOne({
					where: { email: email },
					raw: true,
				});
				if (user) {
					let check = await bcrypt.compareSync(password, user.password);
					if (check) {
						let payload = {
							id: user.id,
							email: user.email,
							fullName: user.fullName,
						};
						let token = CreateJWT(payload);
						userData.errCode = 0;
						userData.errMessage = `OK`;
						delete user.password;
						userData.user = user;
						userData.DT = {
							access_token: token,
						};
					} else {
						userData.errCode = 3;
						userData.errMessage = `Yours's Email or Password is incorrect!`;
					}
				} else {
					userData.errCode = 2;
					userData.errMessage = `User's not found`;
				}
			} else {
				userData.errCode = 1;
				userData.errMessage = `Yours's Email or Password is incorrect!`;
			}
			resolve(userData);
		} catch (e) {
			reject(e);
		}
	});
};

let CheckUserEmail = (userEmail) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { email: userEmail },
			});
			if (user) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getAllUser = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = "";
			if (userId === "ALL") {
				users = await db.User.findAll({
					attributes: {
						exclude: ["password"],
					},
				});
			}
			if (userId && userId !== "ALL") {
				users = await db.User.findOne({
					where: { id: userId },
					attributes: {
						exclude: ["password"],
					},
				});
			}
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};
let CreateNewUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let check = await CheckUserEmail(data.email);
			if (check === true) {
				resolve({
					errCode: 1,
					errMessage: "Your email has exist",
				});
			} else {
				let hashPasswordFromBcrypt = await hashUserPassword(data.password);
				await db.User.create({
					//(value my sql): (value name-html)
					email: data.email,
					password: hashPasswordFromBcrypt,
					fullName: data.fullName,
					// Gender: data.gender == "1" ? true : false,
				});
				resolve({
					errCode: 0,
					message: "Create success",
				});
			}
		} catch {
			reject(e);
		}
	});
};
let DeleteUser = (User_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { id: User_id },
			});
			if (user) {
				await db.User.destroy({
					where: { id: User_id },
				});
				resolve({
					errCode: 0,
					message: `The User is deleted`,
				});
			} else {
				resolve({
					errCode: 2,
					errMessage: `The user isn't exist`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
let updateUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 2,
					errMessage: "Missing required parameter!",
				});
			}
			let user = await db.User.findOne({
				where: { id: data.id },
			});
			if (user) {
				await db.User.update(
					{
						firstName: data.firstName,
						lastName: data.lastName,
						Address: data.Address,
					},
					{
						where: { id: data.id },
					}
				);

				resolve({
					errCode: 0,
					message: "Update User Success!",
				});
			} else {
				resolve({
					errCode: 1,
					errMessage: "User Not Found!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	HandleUserLogin: HandleUserLogin,
	getAllUser: getAllUser,
	CreateNewUser: CreateNewUser,
	DeleteUser: DeleteUser,
	updateUser: updateUser,
};
