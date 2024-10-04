import React from "react";
import "../Login/login.css";
const Login = () => {
	return (
		<section className="section_login">
			<div className="container-fluid">
				<form className="mx-auto">
					<h4 className="text-center">Login</h4>
					<div className="form-group mb-3 mt-5">
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
						<div id="emailHelp" class="form-text">
							Forget password?
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
