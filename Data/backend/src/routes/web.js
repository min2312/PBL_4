import express from "express";
import userController from "../controllers/userController";
import adminController from "../controllers/adminController";
import { checkUserJWT } from "../middleware/JWT_Action";
import apiController from "../controllers/apiController";
let router = express.Router();

let initWebRoutes = (app) => {
	router.all("*", checkUserJWT);
	router.post("/api/login", userController.HandleLogin);
	router.post("/api/admin_login", adminController.HandleLoginAdmin);
	router.post("/api/logout", userController.HandleLogOut);
	router.get("/api/get-all-user", userController.HandleGetAllUser);
	router.get("/api/get-info-car", userController.HandleGetInfoCar);
	router.get("/api/getAllCar", apiController.HandleGetAllCar);
	router.get("/api/account", userController.getUserAccount);
	router.get("/api/getTypeTicket", apiController.HandleGetTypeTicket);
	router.put("/api/edit-user", userController.HandleEditUser);
	router.post("/api/create-new-user", userController.HandleCreateNewUser);
	router.post("/api/create-new-car", apiController.HandleCreateNewCar);
	router.post("/api/create-ticket", apiController.HandleCreatePayment);
	router.delete("/api/delete-user", userController.HandleDeleteUser);
	return app.use("/", router);
};

module.exports = initWebRoutes;
