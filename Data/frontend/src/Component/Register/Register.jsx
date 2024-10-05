import React from "react";
import { useHistory } from "react-router-dom";
import "./register.css";
const Register = () => {
	let history = useHistory();
	const HandleLogin = () => {
		history.push("/login");
	};
	return (
		<section className="section_register">
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
					<div className="col-4 content-right register-form">
						<form className="mx-auto d-flex flex-column">
							<h4 className="text-center">Register</h4>
							<div className="form-group mb-3 mt-2">
								<label className="form-label">FullName:</label>
								<input
									type="email"
									className="form-control"
									id="FullName"
									placeholder="Enter FullName"
								/>
							</div>
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
							</div>
							<button type="submit" className="btn btn-primary mt-3">
								Register
							</button>
							<hr />
							<label className=" label">
								Already've an account.{" "}
								<a href="" onClick={() => HandleLogin()}>
									Login
								</a>
							</label>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
