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
module.exports = {
	HandleCreateNewCar: HandleCreateNewCar,
	HandleGetAllCar: HandleGetAllCar,
};
