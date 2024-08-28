import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const ResearchClientChat = ({ setDisplayWidget }) => {
	const [search, setSearch] = useState('');

	const [clients, setClients] = useState({
		unread: [
			{	
				id: 0,
				firstName: "Gaëlle",
				lastName: "GHIZOLI",
				date: "01/01/2024",
				lastMessage: "Last message 1",
				online: true
			},
			{
				id: 1,
				firstName: "Maxence",
				lastName: "ABRILE",
				date: "07/09/2022",
				lastMessage: "Last message 2",
				online: false
			}
		],
		read: [
			{
				id: 2,
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
				<div className="research__searchbar">
					<input type="search" value={search} placeholder="Search for a chat..." onChange={(e) => setSearch(e.value)}/>
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
																<Link to={`/chat/${elm.id}`}>
																	<div className="flex-row-between long-result" onClick={() => setDisplayWidget(false)}>
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
																</Link>
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

export default ResearchClientChat;