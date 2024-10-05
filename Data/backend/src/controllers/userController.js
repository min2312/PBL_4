import userService from "../service/userService";
let HandleLogin = async (req, res) => {
	let email = req.body.email;
	let pass = req.body.password;
	if (!email || !pass) {
		return res.status(500).json({
			errcode: 1,
			message: "Missing inputs parameter!",
		});
	}

	let userdata = await userService.HandleUserLogin(email, pass);
	return res.status(200).json({
		errcode: userdata.errCode,
		message: userdata.errMessage,
		user: userdata.user ? userdata.user : {},
	});
};

let HandleGetAllUser = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter",
			user: [],
		});
	}
	let user = await userService.getAllUser(id);
	return res.status(200).json({
		errCode: 0,
		errMessage: "OK",
		user: user,
	});
};
let HandleCreateNewUser = async (req, res) => {
	let message = await userService.CreateNewUser(req.body);
	return res.status(200).json(message);
};
let HandleEditUser = async (req, res) => {
	let data = req.body;
	let message = await userService.updateUser(data);
	return res.status(200).json(message);
};
let HandleDeleteUser = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameters!",
		});
	}
	let message = await userService.DeleteUser(req.body.id);
	return res.status(200).json({
		...message,
	});
};
module.exports = {
	HandleLogin: HandleLogin,
	HandleGetAllUser: HandleGetAllUser,
	HandleCreateNewUser: HandleCreateNewUser,
	HandleEditUser: HandleEditUser,
	HandleDeleteUser: HandleDeleteUser,
};
