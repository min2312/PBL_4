import React from "react";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../Component/Users/Users";
const ClientRoute = () => {
	return (
		<div>
			<Switch>
				<PrivateRoutes path="/users" component={Users} />
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/users">users</Route>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="*">404 Not Found</Route>
			</Switch>
		</div>
	);
};

export default ClientRoute;
