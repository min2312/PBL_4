import axios from "axios";
const LoginUser = (data) => {
	return axios
		.post("http://localhost:8081/api/login", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error(error);
		});
};

const CreateNewUser = (data) => {
	return axios
		.post("http://localhost:8081/api/create-new-user", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error(error);
		});
};
export { LoginUser, CreateNewUser };
