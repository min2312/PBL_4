import React, { useState, useContext, useEffect } from "react";
import Modal_Search from "../ModalUser/Modal_Search";
import {
	useHistory,
	useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import { GetAllUser } from "../../services/userService";
import { MoneyDeposit, PaymentZaloPay } from "../../services/apiService";

const DepositMoney = () => {
	const history = useHistory();
	const location = useLocation();
	const { user } = useContext(UserContext);

	const defaultValue = {
		id_user: "",
		fullName: "",
		phone: "",
		price: "",
	};
	const [formValues, setFormValues] = useState(defaultValue);
	const [users, setUsers] = useState([]);
	const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

	// Lấy dữ liệu người dùng
	const GetData = async () => {
		try {
			let id_User = "ALL";
			if (user && user.isAuthenticated) {
				id_User = user.account.id || id_User;
			}
			let response = await GetAllUser(id_User);
			if (response && response.errCode === 0) {
				setUsers(
					Array.isArray(response.user) ? response.user : [response.user]
				);
			} else {
				toast.error("Get Data Failed");
			}
		} catch (e) {
			toast.error("Get Data Failed");
		}
	};
	useEffect(() => {
		GetData();
	}, [formValues.id_user]);
	// Lấy thông tin từ location state
	useEffect(() => {
		if (location.state && location.state.user_ticket) {
			const userTicket = location.state.user_ticket;
			setFormValues({
				id_user: userTicket.users.id,
				fullName: userTicket.users.fullName,
				phone: userTicket.users.phone,
				price: userTicket.Reservation.price,
			});
		}
	}, [location]);

	const HandleOpenModalSearch = (name) => {
		setIsOpenModalSearch(!isOpenModalSearch);
	};

	const HandleUserSelect = (selectedUser) => {
		setFormValues({
			id_user: selectedUser.id,
			fullName: selectedUser.fullName,
			phone: selectedUser.phone,
		});
		setIsOpenModalSearch(false);
	};
	const checkValidInput = () => {
		let isValid = true;
		const arrInput = ["fullName", "phone", "price"];
		for (let i = 0; i < arrInput.length; i++) {
			if (!formValues[arrInput[i]]) {
				isValid = false;
				toast.error("Missing parameter: " + arrInput[i]);
				break;
			}
			if (i === 2 && parseFloat(formValues[arrInput[i]]) <= 0) {
				isValid = false;
				toast.error(arrInput[i] + " Not Valid");
				break;
			}
		}
		return isValid;
	};
	const HandleCreateTicket = async () => {
		const check = checkValidInput();
		if (check) {
			try {
				let payment = await PaymentZaloPay(formValues);
				if (payment && payment.return_code === 1) {
					window.location.href = payment.order_url;
				} else {
					toast.error("Payment Failed");
				}
			} catch (e) {
				toast.error("Error while Deposit Money");
			}
		}
	};

	const HandleReturn = () => {
		history.push("/users");
	};

	return (
		<>
			<Modal_Search
				isOpen={isOpenModalSearch}
				toggle={HandleOpenModalSearch}
				data={users}
				SelectedUser={HandleUserSelect}
			/>
			<div className="row mt-4">
				<div className="col-6">
					<div className="input-group mb-3">
						<span className="input-group-text">User's Name:</span>
						<input
							type="text"
							className="form-control"
							name="fullName"
							value={formValues.fullName}
							disabled
						/>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text">Phone Number:</span>
						<input
							type="text"
							className="form-control"
							name="phone"
							value={formValues.phone}
							disabled
						/>
					</div>
				</div>
				<div className="col-6">
					<div className="input-group mb-3">
						<button className="btn btn-success" onClick={HandleOpenModalSearch}>
							Search User
						</button>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text">Price:</span>
						<input
							type="number"
							className="form-control"
							name="price"
							value={formValues.price}
							onChange={(e) =>
								setFormValues({ ...formValues, price: e.target.value })
							}
						/>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center mt-5">
				<button className="btn btn-secondary" onClick={HandleReturn}>
					Back
				</button>
				<button className="btn btn-success ms-4" onClick={HandleCreateTicket}>
					Save
				</button>
			</div>
		</>
	);
};

export default DepositMoney;
