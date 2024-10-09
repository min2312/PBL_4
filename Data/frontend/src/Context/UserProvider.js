import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = createContext({ name: "", auth: false });
const UserProvider = ({ children }) => {
	// User is the name of the "data" that gets stored in context
	const userDefault = {
		isLoading: true,
		isAuthenticated: false,
		token: "",
		account: {},
	};
	const [user, setUser] = useState(userDefault);

	// Login updates the user data with a name parameter
	const loginContext = (userData) => {
		setUser({ ...userData, isLoading: false });
	};

	// Logout updates the user data to default
	const logout = () => {
		setUser((user) => ({
			name: "",
			auth: false,
		}));
	};

	const fetchUser = async () => {
		let response = await getUserAccount();
		if (response && response.errCode === 0) {
			let token = response.DT.access_token;
			let email = response.DT.email;
			let fullName = response.DT.fullName;
			let id = response.DT.id;
			let data = {
				isAuthenticated: true,
				token,
				account: { id, email, fullName },
				isLoading: false,
			};
			setUser(data);
		} else {
			setUser({ ...userDefault, isLoading: false });
		}
	};

	useEffect(() => {
		if (
			window.location.pathname !== "/" ||
			window.location.pathname !== "/login"
		) {
			fetchUser();
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, loginContext, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
