import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const ResearchClient = () => {
	const [search, setSearch] = useState('');

	const [clients, setClients] = useState({
		unread: [
			{	
				firstName: "Gaëlle",
				lastName: "GHIZOLI",
				date: "01/01/2024",
				lastMessage: "Last message 1",
				online: true
			},
			{
				firstName: "Maxence",
				lastName: "ABRILE",
				date: "07/09/2022",
				lastMessage: "Last message 2",
				online: false
			}
		],
		read: [
			{
				firstName: "Personal",
				lastName: "ABRILE",
				date: "01/07/2024",
				lastMessage: "Last message 3",
				online: true
			}
		]
	});

	return (
		<>
			<div id="researchClient" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__client">
					<input type="search" value={search} placeholder="Search for a client..." onChange={(e) => setSearch(e.value)}/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						{
							clients.length !== 0 ?
							["unread", "read"].map((list) => {
								if (clients[list].length !== 0) {
									return (
										<div className="flex-row">
											<div className="vertical-line"></div>
											<div>
												<h3 className="widget-title">{list === "read" ? "Read" : "Unread"}</h3>
												<div className="flex-col sub-container">
													{
														clients[list].map((elm) => {
															return (
																<div className="flex-row-between long-result">
																	<div className="flex-col">
																		<p><b>{elm.lastName} {elm.firstName}</b>
																			<sub>- {elm.date}</sub>
																		</p>
																		<p><i>{elm.lastMessage}</i></p>
																	</div>
																	<div>
																		<div className={ elm.online ? "online" : "offline" }></div>
																		<p>{ elm.online ? "Online" : "Offline" }</p>
																	</div>
																</div>
															);
														})
													}
												</div>
											</div>
										</div>	
									);
								}
							}) : null
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default ResearchClient;