import React from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
const Login = () => {
	let history = useHistory();
	const HandleCreateAccount = () => {
		history.push("/register");
	};
	return (
		<section className="section_login">
			<div className="container-fluid">
				<div className="row">
					<div className="col-7 content-left">
						<div className="brand">Parking Car Systems</div>
						<div className="title">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
							inventore porro! Neque ad quod, impedit, accusamus, accusantium
							incidunt molestiae vel omnis mollitia aliquam earum totam animi
							consequuntur libero eveniet expedita.
						</div>
					</div>
					<div className="col-4 content-right login-form">
						<form className="mx-auto d-flex flex-column">
							<h4 className="text-center">Login</h4>
							<div className="form-group mb-3 mt-2">
								<label for="exampleInputEmail1" className="form-label">
									Email address
								</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword1" className="form-label">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
								/>
								<div id="emailHelp" class="form-text text-center">
									<a href="#" className="forget_pass">
										Forget password?
									</a>
								</div>
							</div>
							<button type="submit" className="btn btn-primary mt-3">
								Login
							</button>
							<hr />
							<button
								className="btn btn-success content-center mb-3"
								onClick={() => HandleCreateAccount()}
							>
								Create New Account
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
