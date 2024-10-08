import React, { useContext, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../Context/UserProvider";

const PrivateRoutes = (props) => {
	let history = useHistory();
	const { user } = useContext(UserContext);
	useEffect(() => {
		let session = sessionStorage.getItem("abc");
		console.log(user);
		if (!session) {
			history.push("/login");
		}
	}, []);
	return (
		<div>
			<Route path={props.path} component={props.component} />
		</div>
	);
};

export default PrivateRoutes;
