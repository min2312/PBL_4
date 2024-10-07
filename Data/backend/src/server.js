import express from "express";
import bodyParser from "body-parser";
import initWebRouters from "./routes/web";
import connectDB from "../config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRouters(app);

connectDB();
let port = process.env.PORT || 6969;
app.listen(port, () => {
	console.log("Backend Nodejs is running on the port: " + port);
});
