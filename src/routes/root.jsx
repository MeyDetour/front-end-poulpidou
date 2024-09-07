import React, { useState, useEffect, createRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import Axios from 'axios';

// Hooks
import { useKeyBindings } from '../hooks/useKeyBindings';

// Components
import Navbar from '../components/navbar';

// Widgets
import Research from '../components/widgets/research';
import CreateProject from '../components/widgets/createProject';
import NewClient from '../components/widgets/newClient';
import AddSpecifications from '../components/widgets/addSpecifications';

const Root = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Automatic log out if token doesn't exist
	useEffect(() => {
		const events = ['click', 'dblclick', 'mousemove', 'wheel'];

		const handleUserConnection = () => {
			if (!sessionStorage.getItem("token"))  {
				return navigate('/login');
			}
		}

		events.forEach(event => document.addEventListener(event, handleUserConnection));

		return () => {
			events.forEach(event => document.removeEventListener(event, handleUserConnection));
		};
	});


	const [keyPressed, resetKeyPressed] = useKeyBindings(null, ['k', 'n'], true);
	const [widget, setWidget] = useState(null);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				resetKeyPressed();
				setWidget(null);
			}
		}
		document.addEventListener("keydown", handleKeyDown, true);

		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
		};
	}, []);

	return (
		<>
			<Navbar />
			{/*<React.Suspense fallack={<div id="content">Loading...</div>}>*/}
				<div id="content" className={"flex-col " + (location.pathname.startsWith("/client") || location.pathname.startsWith("/projects") ? "clientsContent" : null)}>
					<Outlet />
				</div>
			{/*</React.Suspense>*/}
			<div 
				id="widget"
				className="grid-center"
				onClick={() => {resetKeyPressed(); setWidget(null)}}
				style={{visibility: keyPressed || (widget !== null && widget !== "researchClient") ? "visible": "hidden"}}
			>
				{
					keyPressed === "k" ? <Research />
					: keyPressed === "n"? <CreateProject />
					: widget === "newClient" ? <NewClient />
					: widget === "addSpecifications" ? <AddSpecifications />
					: null
				}
			</div>
			<ToastContainer />
		</>
	);
}

export default Root;
