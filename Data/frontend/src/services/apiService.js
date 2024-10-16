import axios from "../setup/axios";

const CreateNewCar = (car, user) => {
	return axios.post("/api/create-new-car", { car, user });
};

const getAllCar = async (InputId) => {
	return axios
		.get(`/api/getAllCar?id=${InputId}`)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log(err);
		});
};
export { CreateNewCar, getAllCar };
