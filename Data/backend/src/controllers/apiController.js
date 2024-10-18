import apiService from "../service/apiService";

let HandleCreateNewCar = async (req, res) => {
	// const user = req.user;
	// const carData = req.body;
	const { car, user } = req.body;
	try {
		const result = await apiService.CreateNewCar(car, user);
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ errCode: 1, message: "Error creating car" });
	}
};
let HandleGetAllCar = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter",
			car: [],
		});
	}
	let car = await apiService.GetAllCar(id);
	return res.status(200).json({
		errCode: 0,
		errMessage: "OK",
		car: car,
	});
};
let HandleGetTypeTicket = async (req, res) => {
	let type_ticket = req.query.type;
	try {
		const result = await apiService.GetTicketType(type_ticket);
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ errCode: 1, message: "Error get type ticket" });
	}
};
let HandleCreatePayment = async (req, res) => {
	let data = req.body;
	try {
		const result = await apiService.CreatePayment(data);
		return res.status(200).json({
			errCode: result.errCode,
			errMessage: result.errMessage,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ errCode: 1, errMessage: "Error Create Ticket" });
	}
};
module.exports = {
	HandleCreateNewCar: HandleCreateNewCar,
	HandleGetAllCar: HandleGetAllCar,
	HandleGetTypeTicket: HandleGetTypeTicket,
	HandleCreatePayment: HandleCreatePayment,
};
