import { useState, React } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CreateNewUser } from "../../services/userService";

const Register = () => {
	let history = useHistory();
	const defaultobjvalidinput = {
		isValidFullName: true,
		isValidEmail: true,
		isValidPass: true,
	};
	const [objvalidinput, setObjvalidinput] = useState(defaultobjvalidinput);
	const HandleLogin = () => {
		history.push("/login");
	};

	const [formValues, setFormValues] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formValues.fullName || !formValues.email || !formValues.password) {
			toast.error("Please fill in all fields");
			return;
		}
		try {
			const response = await CreateNewUser(formValues);
			if (response && response.errCode === 0) {
				toast.success("Success Register");
				history.push("/login");
			} else {
				toast.error(response.errMessage);
			}
		} catch (e) {
			toast.error("Register failed. Please try again.");
			console.log(e);
		}
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
						<form
							className="mx-auto d-flex flex-column"
							onSubmit={handleSubmit}
						>
							<h4 className="text-center">Register</h4>
							<div className="form-group mb-3 mt-2">
								<label className="form-label">FullName:</label>
								<input
									type="text"
									className="form-control"
									id="FullName"
									name="fullName"
									value={formValues.fullName}
									onChange={handleInputChange}
									placeholder="Enter FullName"
								/>
							</div>
							<div className="form-group mb-3 mt-2">
								<label className="form-label">Email address</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									name="email"
									value={formValues.email}
									onChange={handleInputChange}
									aria-describedby="emailHelp"
									placeholder="Enter email"
								/>
							</div>
							<div className="form-group">
								<label className="form-label">Password</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									name="password"
									value={formValues.password}
									onChange={handleInputChange}
									placeholder="Password"
								/>
							</div>
							<button
								type="submit"
								onClick={handleSubmit}
								className="btn btn-primary mt-3"
							>
								Register
							</button>
							<hr />
							<label className="label">
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
