import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../NavBar/nav.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
const NavBar = () => {
	const [isShow, setIsShow] = useState(false);
	useEffect(() => {
		let session = sessionStorage.getItem("abc");
		if (session) {
			setIsShow(true);
		}
	}, []);
	const handleLogout = () => {
		sessionStorage.removeItem("abc");
		setIsShow(false);
		window.location.reload();
	};
	return (
		<>
			<div>
				<div className="navbarClient">
					<div className="navContainer">
						<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
							<span className="logo">Parking Car</span>
						</Link>
						<Nav>
							{isShow === true ? (
								<>
									<NavDropdown
										title={""}
										className="NavDropdown"
										id="basic-nav-dropdown"
									>
										<NavDropdown.Item>Change Password</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item>
											<span onClick={() => handleLogout()}>Log out</span>
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<Link className="nav-link" to="/login">
									<button
										className="btn btn-outline-info me-2 mb-1"
										type="button"
									>
										Login
									</button>
								</Link>
							)}
						</Nav>
					</div>
				</div>
			</div>
		</>
	);
};

export default NavBar;
