import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAllUser } from "../../services/userService";
import "../Users/users.css";
const Users = () => {
	const [users, setUsers] = useState([]);
	const GetData = async () => {
		try {
			let respone = await GetAllUser("ALL");
			if (respone && respone.errCode === 0) {
				setUsers(respone.user);
			} else {
				toast.error("Get Data Failed");
			}
		} catch (e) {
			toast.error("Get Data Failed");
		}
	};
	useEffect(() => {
		GetData();
	}, []);
	return (
		<div className="user-container">
			{/* <Modal_User
				isOpen={this.state.isOpenModalUser}
				toggle={this.ToggleUserModal}
				createNewUser={this.createNewUser}
			/>
			{this.state.isOpenModalEditUser && (
				<Modal_Edit_User
					isOpen={this.state.isOpenModalEditUser}
					toggle={this.ToggleUserModal}
					User_edit={this.state.user_edit}
					EditUser={this.DoEditUser}
				/>
			)} */}
			<div className="title text-center">Manage user</div>
			<div className="mx-1">
				<button
					className="btn btn-primary px-3"
					// onClick={() => this.HandleAddNewUser()}
				>
					<i className="fas fa-plus"></i> Add New User
				</button>
			</div>
			<div className="users-table mt-3 mx-1">
				<table id="customers">
					<tbody>
						<tr>
							<th>Id</th>
							<th>Email</th>
							<th>FullName</th>
							<th>Action</th>
						</tr>
						{users &&
							users.length > 0 &&
							users.map((item, index) => {
								return (
									<tr>
										<td>{index + 1}</td>
										<td>{item.email}</td>
										<td>{item.fullName}</td>
										<td>
											<button
												className="btn btn-outline-light text-warning mx-2"
												// onClick={() => this.HandleEditUser(item)}
											>
												<i className="bi bi-pencil"></i>
											</button>
											<button
												className="btn btn-outline-light text-warning mx-2"
												// onClick={() => this.HandleEditUser(item)}
											>
												<i className="far fa-edit edit_btn"></i>
											</button>
											<button
												className="btn btn-outline-light text-danger ms-3"
												// onClick={() => this.HandleDeleteUser(item)}
											>
												<i className="bi bi-trash"></i>
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
