import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
