import axios from "../setup/axios";

const CreateNewCar = (car, user) => {
	return axios.post("/api/create-new-car", { car, user });
};

const getAllCar = async (InputId) => {
	let idQuery = Array.isArray(InputId) ? InputId.join(",") : InputId;
	return axios
		.get(`/api/getAllCar?id=${idQuery}`)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log(err);
		});
};
const getAllCar_Ticket = async (InputId) => {
	let idQuery = Array.isArray(InputId) ? InputId.join(",") : InputId;
	return axios
		.get(`/api/getAllCar_Ticket?id=${idQuery}`)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getTypeTicket = async (type_ticket) => {
	return axios.get(`/api/getTypeTicket?type=${type_ticket}`);
};
const CreateTicket = async (data) => {
	return axios.post("/api/create-ticket", data);
};
const DeleteTicket = async (data) => {
	return axios.post("/api/delete-ticket", data);
};
export {
	CreateNewCar,
	getAllCar,
	getAllCar_Ticket,
	getTypeTicket,
	CreateTicket,
	DeleteTicket,
};
