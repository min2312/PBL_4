import "./App.css";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
