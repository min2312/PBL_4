import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAllUser } from "../../services/userService";
import "../Users/users.css";
import { UserContext } from "../../Context/UserProvider";
import Modal_User from "../ModalUser/Modal_User";
import Modal_Edit_User from "../Modal_Edit_User/Modal_Edit_User";
const Users = () => {
	const [users, setUsers] = useState([]);
	const { user } = useContext(UserContext);
	const [userEdit, setUserEdit] = useState({});
	const [isOpenModalUser, setIsOpenModalUser] = useState(false);
	const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
	const GetData = async () => {
		try {
			let id_User = "ALL";
			if (user && user.isAuthenticated === true) {
				id_User = user.account.id || id_User;
			}
			let respone = await GetAllUser(id_User);
			if (respone && respone.errCode === 0) {
				if (Array.isArray(respone.user)) {
					setUsers(respone.user);
				} else {
					setUsers([respone.user]);
				}
			} else {
				toast.error("Get Data Failed");
			}
		} catch (e) {
			toast.error("Get Data Failed");
			console.log("err:", e);
		}
	};
	useEffect(() => {
		GetData();
	}, []);
	const HandleAddNewUser = () => {
		setIsOpenModalUser(true);
	};
	const HandleEditUser = (user) => {
		setIsOpenModalEditUser(true);
		setUserEdit(user);
	};
	const toggleUserModal = (name) => {
		if (name === "isOpenModalUser") {
			setIsOpenModalUser(!isOpenModalUser);
		} else if (name === "isOpenModalEditUser") {
			setIsOpenModalEditUser(!isOpenModalEditUser);
		}
	};
	// DoEditUser = async (user) => {
	// 	try {
	// 		let respone = await EditUserService(user);
	// 		console.log(respone);
	// 		if (respone && respone.errCode === 0) {
	// 			this.setState({
	// 				isOpenModalEditUser: false,
	// 			});
	// 			await this.GetAllUsers();
	// 		} else {
	// 			alert(respone.errMessage);
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };
	return (
		<div className="user-container">
			<Modal_User
				isOpen={isOpenModalUser}
				toggle={toggleUserModal}
				//createNewUser={createNewUser}
			/>
			{isOpenModalEditUser && (
				<Modal_Edit_User
					isOpen={isOpenModalEditUser}
					toggle={toggleUserModal}
					userEdit={userEdit}
					// EditUser={doEditUser}
				/>
			)}
			<div className="title text-center">Manage user</div>
			{user.account.id === undefined ? (
				<div className="mx-1">
					<button
						className="btn btn-primary px-3"
						onClick={() => HandleAddNewUser()}
					>
						<i className="fas fa-plus"></i> Add New User
					</button>
				</div>
			) : (
				<></>
			)}
			<div className="users-table mt-3 mx-1">
				<table id="customers">
					<tbody>
						<tr>
							<th>Id</th>
							<th>Email</th>
							<th>FullName</th>
							<th className="px-5">Action</th>
							<th>Car Information</th>
						</tr>
						{users &&
							users.length > 0 &&
							users.map((item, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.email}</td>
										<td>{item.fullName}</td>
										<td>
											<button
												className="btn btn-outline-light text-warning mx-2"
												onClick={() => HandleEditUser(item)}
											>
												<i className="bi bi-pencil"></i>
											</button>
											<button
												className="btn btn-outline-light text-danger ms-3"
												// onClick={() => this.HandleDeleteUser(item)}
											>
												<i className="bi bi-trash"></i>
											</button>
										</td>
										<td>
											<button className="btn btn-outline-light text-black mx-4">
												<i class="bi bi-eye"></i>
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
