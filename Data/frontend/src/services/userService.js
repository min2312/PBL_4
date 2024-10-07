import axios from "../setup/axios";
const LoginUser = (data) => {
	return axios
		.post("/api/login", data)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};

const CreateNewUser = (data) => {
	return axios
		.post("/api/create-new-user", data)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const GetAllUser = (InputId) => {
	return axios
		.get(`/api/get-all-user?id=${InputId}`)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log(err);
		});
};
export { LoginUser, CreateNewUser, GetAllUser };
