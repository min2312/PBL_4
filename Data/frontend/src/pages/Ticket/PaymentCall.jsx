import React, { useEffect, useRef, useState } from "react";
import {
	CancelDeposit,
	CheckPayment,
	MoneyDeposit,
} from "../../services/apiService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const PaymentCall = () => {
	const history = useHistory();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const appTransId = queryParams.get("apptransid");
	const id_user = queryParams.get("id_user");
	const status = queryParams.get("status");
	const amount = queryParams.get("amount");
	const hasChecked = useRef(false);
	const [formValues, setFormValues] = useState({
		id_user: id_user,
		price: amount,
	});
	const handleCheck = async () => {
		let data = { id_user: id_user, amount: amount };
		if (hasChecked.current) return;
		hasChecked.current = true;
		if (status !== "-49") {
			const paymentStatus = await CheckPayment(appTransId);
			if (paymentStatus && paymentStatus.return_code === 1) {
				let response = await MoneyDeposit(formValues);
				if (response && response.errCode === 0) {
					toast.success("Successful Transaction");
					history.push("/users");
				} else {
					toast.error(response.errMessage);
				}
			} else {
				toast.error(paymentStatus.return_message);
				// await CancelDeposit(data);
				history.push("/users");
			}
		} else {
			toast.error("Transaction Failed");
			// await CancelDeposit(data);
			history.push("/users");
		}
	};

	useEffect(() => {
		handleCheck();
	}, []); // Chạy useEffect một lần khi component mount

	return null;
};

export default PaymentCall;
