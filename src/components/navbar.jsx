import React from 'react';

import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
	const location = useLocation();

	return (
		<>
			<div id="navbar" className="flex-col-between">
				<div>
					<h1>Poulpidou</h1>
					<ul>
						<li>
							<NavLink 
								to={`/home`}
								className={
									location.pathname.startsWith("/home") ||
									location.pathname === "/" ? "selected" : ''
								}>Home</NavLink>
						</li>
						<li>
							<NavLink 
								to={`/dashboard`}
								className={
									location.pathname.startsWith("/dashboard") ? "selected" : ''
								}>Dashboard</NavLink>
						</li>
						<li>
							<NavLink 
								to={`/projects`} // TO DO : Do not add an id...
								className={
									location.pathname.startsWith("/project") ? "selected" : ''
								}>Projects</NavLink>
						</li>
						<li>
							<NavLink 
								to={`/chats`}
								className={
									location.pathname.startsWith("/chat") ? "selected" : ''
								}>Chats</NavLink>
						</li>
						<li>
							<NavLink 
								to={`/clients`}
								className={
									location.pathname.startsWith("/client") ? "selected" : ''
								}>Clients</NavLink>
						</li>
						<li>
							<NavLink 
								to={`/settings/configuration`}
								className={
									location.pathname.startsWith("/settings") ? "selected" : ''
								}>Settings</NavLink>
						</li>
					</ul>
				</div>
				<p className="app-version">version 0.0.1</p>
			</div>
		</>
	);
}

export default NavBar;