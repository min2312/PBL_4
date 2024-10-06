import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoutes = (props) => {
	let history = useHistory();
	useEffect(() => {
		let session = sessionStorage.getItem("abc");
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
