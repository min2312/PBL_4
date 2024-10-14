import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../ModalUser/modalUser.css";
const Modal_User = (props) => {
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
		fullName: "",
		phone: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const { isOpen, toggle } = props;

	return (
		<div className="text-center">
			<Modal
				show={isOpen}
				onHide={() => toggle("isOpenModalUser")}
				centered
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Create New User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-user-body">
						<div className="row mb-3">
							<div className="col-md-6">
								<label>Email</label>
								<input
									type="text"
									className="form-control"
									name="email"
									value={formValues.email}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6">
								<label>Password</label>
								<input
									type="password"
									className="form-control"
									name="password"
									value={formValues.password}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-md-6">
								<label>Full Name</label>
								<input
									type="text"
									className="form-control"
									name="fullName"
									value={formValues.fullName}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6">
								<label>Phone Number</label>
								<input
									type="text"
									className="form-control"
									name="phone"
									value={formValues.phone}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
					<h3 className="text-center mb-4">List View Car</h3>

					<table className="table table-striped table-bordered" id="customers">
						<tbody>
							<tr>
								<th>STT</th>
								<th>Type Car</th>
								<th>License Plate</th>
								<th>In Time</th>
								<th>Out Time</th>
							</tr>
							<tr>
								<td>1</td>
								<td>Ô tô</td>
								<td>30E-12345</td>
								<td>08:00</td>
								<td>17:00</td>
							</tr>
						</tbody>
					</table>
					<button className="button_add_car">Add Car</button>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						className="px-2" /*onClick={handleAddNewUser}*/
					>
						Save Changes
					</Button>
					<Button
						variant="secondary"
						className="px-2"
						onClick={() => toggle("isOpenModalUser")}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Modal_User;
