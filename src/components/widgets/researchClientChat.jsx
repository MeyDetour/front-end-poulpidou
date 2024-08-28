import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {getLogs} from "../../requests/globals/getLogs";
import {toast} from "react-toastify";
import {getChats} from "../../requests/globals/getChats";
import {getClients} from "../../requests/widgets/getClients";

const ResearchClientChat = ({ setDisplayWidget }) => {
	const [search, setSearch] = useState('');

	const [chats, setChats] = useState([]);

	useEffect(() => {
		getChats()
		.then(res => {
			setChats(res.value);
			console.log(res.value)
		})
		.catch(res => toast(res.state, res.value));
	}, [])


	return (
		<>
			<div id="researchClient" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__searchbar">
					<input type="search" value={search} placeholder="Search for a chat..." onChange={(e) => setSearch(e.value)}/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						{
							chats.length !== 0 ?
							["unread", "read"].map((list) => {
								if (chats[list].length !== 0) {
									return (
										<div className="flex-row">
											<div className="vertical-line"></div>
											<div>
												<h3 className="widget-title">{list === "read" ? "Read" : "Unread"}</h3>
												<div className="flex-col sub-container">
													{
														chats[list].map((elm) => {
															return (
																<Link to={`/chat/${elm.id}`}>
																	<div className="flex-row-between long-result" onClick={() => setDisplayWidget(false)}>
																		<div className="flex-col">
																			<p><b>{elm.client.lastName} {elm.client.firstName}: {elm.name}</b>
																				<sub>- {elm.date}</sub>
																			</p>
																			<p><i>{elm.lastMessage ? elm.lastMessage : "No messages here"}</i></p>
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