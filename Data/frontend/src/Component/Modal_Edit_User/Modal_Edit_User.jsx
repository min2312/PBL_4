import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
const Modal_Edit_User = (props) => {
	const [formData, setFormData] = useState({
		email: "",
		fullName: "",
		id: "",
		phone: "",
	});
	useEffect(() => {
		let user = props.userEdit;
		if (user && Object.keys(user).length > 0) {
			setFormData({
				email: user.email,
				fullName: user.fullName,
				phone: user.phone,
				id: user.id,
			});
		}
	}, [props.userEdit]);
	const handleChangeInput = (event, id) => {
		setFormData({
			...formData,
			[id]: event.target.value,
		});
	};
	const checkValidInput = () => {
		let isValid = true;
		const arrInput = ["email", "password", "firstName", "lastName", "Address"];
		for (let i = 0; i < arrInput.length; i++) {
			if (!formData[arrInput[i]]) {
				isValid = false;
				toast.error("Missing parameter: " + arrInput[i]);
				break;
			}
		}
		return isValid;
	};
	const handleEditUser = () => {
		const isValid = checkValidInput();
		if (isValid) {
			props.EditUser(formData);
		}
	};
	return (
		<div className="text-center">
			<Modal
				show={props.isOpen}
				onHide={() => props.toggle("isOpenModalEditUser")}
				className={"abc"}
				size="lg"
				centered
			>
				<Modal.Header toggle={() => props.toggle("isOpenModalEditUser")}>
					<Modal.Title>Edit User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-user-body">
						<div className="row mb-3">
							<div className="col-md-6">
								<label>Email</label>
								<input
									type="text"
									className="form-control"
									value={formData.email}
									onChange={(event) => handleChangeInput(event, "email")}
									disabled
								/>
							</div>
							<div className="col-md-6">
								<label>Full Name</label>
								<input
									type="text"
									className="form-control"
									value={formData.fullName}
									onChange={(event) => handleChangeInput(event, "fullName")}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-md-12">
								<label>Phone Number</label>
								<input
									type="text"
									className="form-control"
									value={formData.phone}
									onChange={(event) => handleChangeInput(event, "phone")}
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
					<Button color="primary" className="px-2" onClick={handleEditUser}>
						Save Changes
					</Button>{" "}
					<Button
						color="secondary"
						className="px-2"
						onClick={() => props.toggle("isOpenModalEditUser")}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Modal_Edit_User;
