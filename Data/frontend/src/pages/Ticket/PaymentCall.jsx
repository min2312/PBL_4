import React, { useEffect } from "react";
import { CheckPayment, DeleteTicket } from "../../services/apiService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const PaymentCall = () => {
	const history = useHistory();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const appTransId = queryParams.get("apptransid");
	const id_car = queryParams.get("id_car");
	const status = queryParams.get("status");
	const handleCheck = async () => {
		let carId = typeof id_car === "object" ? Object.keys(id_car)[0] : id_car;
		if (status !== "-49") {
			const paymentStatus = await CheckPayment(appTransId);
			if (paymentStatus && paymentStatus.return_code === 1) {
				toast.success("Successful transaction");
				history.push("/ticket");
			} else {
				toast.error(paymentStatus.return_message);
				let result = await DeleteTicket(carId);
				history.push("/ticket/create");
			}
		} else {
			toast.error("transaction failed");
			let result = await DeleteTicket(carId);
			history.push("/ticket/create");
		}
	};
	useEffect(() => {
		handleCheck();
	}, []);

	return null;
};

export default PaymentCall;
