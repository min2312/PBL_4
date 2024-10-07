import axios from "../setup/axios";
const LoginUser = (data) => {
	return axios
		.post("/api/login", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error(error);
		});
};

const CreateNewUser = (data) => {
	return axios
		.post("/api/create-new-user", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error(error);
		});
};
export { LoginUser, CreateNewUser };
