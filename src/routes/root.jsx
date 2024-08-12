import React, { useState, useEffect, createRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Axios from 'axios';

// Hooks
import useKeyBindings from '../hooks/useKeyBindings';

// Components
import Navbar from '../components/navbar';

// Widgets
import Research from '../components/widgets/research';
import CreateProject from '../components/widgets/createProject';
import NewClient from '../components/widgets/newClient';
import AddSpecifications from '../components/widgets/addSpecifications';

const Root = () => {
	const location = useLocation();

	const token = createRef();

	const [keyPressed, resetKeyPressed] = useKeyBindings(null, ['k', 'n'], true);
	const [widget, setWidget] = useState(null);

	useEffect(() => {
		console.log("Keys pressed: Ctrl+" + keyPressed);
	}, [keyPressed]);

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
				<div id="content" className={"flex-col " + (location.pathname.startsWith("/clients") ? "clientsContent" : null)}>
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
		</>
	);
}

export default Root;
