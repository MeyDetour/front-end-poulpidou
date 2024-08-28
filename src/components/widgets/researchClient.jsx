import React, { useState, useEffect } from 'react';

import { getClients } from '../../requests/widgets/getClients';

import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/useToast';

const ResearchClient = ({ setDisplayWidget }) => {
	const [search, setSearch] = useState('');

	const toast = useToast();

	const [clients, setClients] = useState([
	// {
	// 	id: 0,
	// 	firstName: "Gaëlle",
	// 	lastName: "GHIZOLI",
	// 	date: "01/01/2024",
	// 	currentProjects: 0,
	// 	online: true
	// },
	// {
	// 	id: 1,
	// 	firstName: "Maxence",
	// 	lastName: "ABRILE",
	// 	date: "07/09/2022",
	// 	currentProjects: 2,
	// 	online: false
	// },
	// {
	// 	id: 2,
	// 	firstName: "Personal",
	// 	lastName: "ABRILE",
	// 	date: "01/07/2024",
	// 	currentProjects: 1,
	// 	online: true
	// }
	]);

	/* 
	{
    "id": 1,
    "firstName": "Coralie",
    "lastName": "DUPONT",
    "job": null,
    "age": null,
    "siret": null,
    "location": null,
    "mail": "meydetour@gmail.com",
    "phone": null,
    "createdAt": "20/08/2024",
    "state": "active",
    "online": false
}
	*/

	useEffect(() => {
		console.log(clients)
	}, [clients])

	useEffect(() => {
		getClients()
		.then(res => setClients(res.value))
		.catch(res => toast(res.state, res.value));
	}, [])

	return (
		<>
			<div id="researchClient" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__searchbar">
					<input type="search" value={search} placeholder="Search for a client..." onChange={(e) => setSearch(e.value)}/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<div className="flex-col sub-container">
									{
										clients.map((elm) => {
											return (
												<Link to={`/client/${elm.id}`}>
													<div className="flex-row-between long-result" onClick={() => setDisplayWidget(false)}>
														<div className="flex-col">
															<p><b>{elm.lastName} {elm.firstName}</b>
																<sub>- {elm.createdAt}</sub>
															</p>
															<p><i>We don't know how many {elm.currentProjects} current project{elm.currentProjects !== 1 && "s" } the client has.</i></p>
														</div>
														<div>
															<div className={ elm.online ? "online" : "offline" }></div>
															<p>{ elm.online ? "Online" : "Offline" }</p>
														</div>
													</div>
												</Link>
											);
										})
									}
								</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</>
	);
}

export default ResearchClient;