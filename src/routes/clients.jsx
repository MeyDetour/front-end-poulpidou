import React, { useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import '../css/clients.css';

import EditProfile from '../components/subpages/clients/editProfile';
import AllChats from '../components/subpages/clients/allChats';
import AllProjects from '../components/subpages/clients/allProjects';
import AllInvoices from '../components/subpages/clients/allInvoices';

import ResearchClient from '../components/widgets/researchClient';

const Clients = () => {
	const { id, subpage } = useParams();
	console.log(id)
	const [displayWidget, setDisplayWidget] = useState(id === undefined);

	const [displayPanel, setDisplayPanel] = useState(true);

	const [client, setClient] = useState({
		firstName: "Mey",
		lastName: "DETOUR",
		id: 0,
		job: "Décoratrice d'interrieur",
		online: true,
		since: "3 years",
		location: "France",
		mail: "meydetour@gmail.com",
		phone: "... really ..."
	});

	const displayClientSelection = () => {

	}

	const toogleDisplayWidget = () => {
		if (typeof id === "undefined") return;
		setDisplayWidget(!displayWidget);
	}

	return (
		<>
		{
			id !== undefined ? 
			<>
				<div id="clients">
					<div className="flex-row-between">
						<div className="flex-col-between client-data" style={{width: displayPanel ? "70%" : "100%"}}>
							<div className="client-data__link-info">
								<h3>Client can follow our job !</h3>
								<p>
									Click the icon to copy the link to the client page. Client will be able to view information about the project and its progresses.<br/>
									You can find this icon on each project thumbnail. Go to Client -> All Projects -> Choose a project and click the icon.
								</p>
								<img src="pictures/icons/link-icon.svg" alt="link" />
							</div>
							<div className="flex-row-between client-data__data">
								<nav>
									<ul className="flex-col-between sub-nav">
										<Link to={`/client/${id}/edit`}>
											<li className={subpage === 'edit' ? "selected" : null}>Edit profile</li>
										</Link>
										<Link to={`/client/${id}/chats`}>
											<li className={subpage === 'chats' ? "selected" : null}>All chats</li>
										</Link>
										<Link to={`/client/${id}/projects`}>
											<li className={subpage === 'projects' ? "selected" : null}>All projects</li>
										</Link>
										<Link to={`/client/${id}/invoices`}>
											<li className={subpage === 'invoices' ? "selected" : null}>Invoices</li>
										</Link>
										<Link to={`/client/${id}/whyDidYouClickedHere`}>
											<li className={subpage === 'whyDidYouClickedHere' ? "selected" : null}>Don't know</li>
										</Link>
									</ul>
								</nav>
								<div className="sub-page">
									{
										subpage === 'edit'
										? <EditProfile />
										: subpage === 'chats' 
										? <AllChats />
										: subpage === 'projects'
										? <AllProjects />
										: subpage === 'invoices'
										? <AllInvoices />
										: <div className="grid-center" style={{height: "100%", textAlign: "center"}}>
											<p style={{color: "var(--text-grey)"}}>We didn't know what content to put, so we went for...<br/>absolutely nothing!</p>
										  </div>
									}
								</div>
							</div>
						</div>
						<div className="flex-col-between client-info" style={{visibility: (displayPanel ? "visible" : "hidden"), position: displayPanel ? "relative" : "absolute"}}>
							<div>
								<img src="pictures/icons/x.svg" alt="x" onClick={() => setDisplayPanel(!displayPanel)}/>
								<div className="flex-row-center">
									<h3>{client.lastName} {client.firstName}</h3>
									<div className="status">
										<div className={ client.online ? "online" : "offline" }></div>
										<p>{ client.online ? "Online" : "Offline" }</p>
									</div>
								</div>

								<p className="sub-title">{client.job}</p>
								<div className="horizontal-line"></div>

								<div className="flex-col client-info__data" style={{gap: "30px"}}>
									<div className="flex-row">
										<p><b>Client since: </b></p>
										<p>{client.since}</p>
									</div>
									<div className="flex-row">
										<p><b>Location: </b></p>
										<p>{client.location}</p>
									</div>
									<div className="flex-row">
										<p><b>Mail: </b></p>
										<p>{client.mail}</p>
									</div>
									<div className="flex-row">
										<p><b>Phone number: </b></p>
										<p>{client.phone}</p>
									</div>
								</div>
							</div>

							<button onClick={() => setDisplayWidget(true)}>Change client</button>
						</div>
					</div>
					<div className="grid-center show-panel" style={{visibility: (!displayPanel ? "visible" : "hidden")}} onClick={() => setDisplayPanel(!displayPanel)}>
						<img src="pictures/icons/panel-reverse.svg" alt="Display panel" />
					</div>
					<div className="grid-center change-client" style={{visibility: (!displayPanel ? "visible" : "hidden")}} onClick={() => setDisplayWidget(true)}>
						<img src="pictures/icons/people.svg" alt="Display panel" />
					</div>
				</div>
			</> : null
		}
		{
			displayWidget || id == undefined ? 
			<>
				<div 
					id="insideWidget"
					className="grid-center"
					onClick={toogleDisplayWidget}
					style={{cursor: typeof id === "undefined" ? "default" : "cursor"}}
				>
					<ResearchClient setDisplayWidget={setDisplayWidget}/>
				</div>
			</> : null
		}
		</>
	);
}

export default Clients;