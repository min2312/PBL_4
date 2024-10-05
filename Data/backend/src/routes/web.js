import express from "express";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", userController.HandleLogin);
	router.get("/api/get-all-user", userController.HandleGetAllUser);
	router.put("/api/edit-user", userController.HandleEditUser);
	router.post("/api/create-new-user", userController.HandleCreateNewUser);
	router.delete("/api/delete-user", userController.HandleDeleteUser);
	return app.use("/", router);
};

module.exports = initWebRoutes;
