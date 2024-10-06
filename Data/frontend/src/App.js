import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientRoute from "./Routes/ClientRoute";
import NavBar from "./Component/NavBar/NavBar";
function App() {
	return (
		<Fragment>
			<Router>
				<div className="app-header">
					<NavBar />
				</div>
				<div className="app-container">
					<ClientRoute />
				</div>
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</Fragment>
	);
}

export default App;
