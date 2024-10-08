import { useState, React, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginUser } from "../../services/userService";
import { UserContext } from "../../Context/UserProvider";
const Login = () => {
	const { loginContext } = useContext(UserContext);
	let history = useHistory();
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const defaultobjvalidinput = {
		isValidLogin: true,
		isValidPass: true,
	};
	const [objvalidinput, setObjvalidinput] = useState(defaultobjvalidinput);
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const HandleCreateAccount = () => {
		history.push("/register");
	};
	const HandleLogin = async (e) => {
		e.preventDefault();
		setObjvalidinput(defaultobjvalidinput);
		if (!formValues.email && !formValues.password) {
			setObjvalidinput({
				...defaultobjvalidinput,
				isValidLogin: false,
				isValidPass: false,
			});
			toast.error("Please fill in your email and password");
			return;
		}
		if (!formValues.email) {
			setObjvalidinput({ ...defaultobjvalidinput, isValidLogin: false });
			toast.error("Please fill in your email");
			return;
		}
		if (!formValues.password) {
			setObjvalidinput({ ...defaultobjvalidinput, isValidPass: false });
			toast.error("Please fill in your password");
		}
		try {
			const response = await LoginUser(formValues);
			if (response && response.errcode === 0) {
				toast.success("Success Login");
				let token = response.DT.access_token;
				let data = {
					isAuthenticated: true,
					token: token,
					id: response.user.id,
					account: response.user,
				};
				window.sessionStorage.setItem("abc", JSON.stringify(data));
				loginContext(data);
				history.push("/users");
				// window.location.reload();
			} else {
				toast.error(response.message);
			}
		} catch (e) {
			toast.error("Login failed. Please try again.");
		}
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
									className={
										objvalidinput.isValidLogin
											? "form-control"
											: "is-invalid form-control"
									}
									id="exampleInputEmail1"
									name="email"
									value={formValues.email}
									onChange={handleInputChange}
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
									className={
										objvalidinput.isValidPass
											? "form-control"
											: "is-invalid form-control"
									}
									id="exampleInputPassword1"
									name="password"
									value={formValues.password}
									onChange={handleInputChange}
									placeholder="Password"
								/>
								<div id="emailHelp" className="form-text text-center">
									<a href="#" className="forget_pass">
										Forget password?
									</a>
								</div>
							</div>
							<button
								type="submit"
								className="btn btn-primary mt-3"
								onClick={HandleLogin}
							>
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
