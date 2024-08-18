import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const ResearchClient = ({ setDisplayWidget }) => {
	const [search, setSearch] = useState('');

	const [clients, setClients] = useState([{
		id: 0,
		firstName: "Gaëlle",
		lastName: "GHIZOLI",
		date: "01/01/2024",
		currentProjects: 0,
		online: true
	},
	{
		id: 1,
		firstName: "Maxence",
		lastName: "ABRILE",
		date: "07/09/2022",
		currentProjects: 2,
		online: false
	},
	{
		id: 2,
		firstName: "Personal",
		lastName: "ABRILE",
		date: "01/07/2024",
		currentProjects: 1,
		online: true
	}]);

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
																<sub>- {elm.date}</sub>
															</p>
															<p><i>{elm.currentProjects} current project{elm.currentProjects !== 1 && "s" }</i></p>
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