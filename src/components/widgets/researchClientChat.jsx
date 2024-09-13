import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { getLogs } from "../../requests/globals/getLogs";
import { getChats } from "../../requests/globals/getChats";
import { getClients } from "../../requests/widgets/getClients";

import { useToast } from "../../hooks/useToast";
import { useSearchbar } from '../../hooks/useSearchbar';

const ResearchClientChat = ({ setDisplayWidget }) => {
	const [search, setSearch] = useState('');

	const [chats, setChats] = useState([]);
	const [chatsDisplay, setChatsDisplay] = useState([]);

	const toast = useToast();

	const searchAmong = useSearchbar();

	const searchbar = useRef(null);

	useEffect(() => {
		getChats()
		.then(res => {
			setChats(res.value);
			setChatsDisplay(res.value);
			console.log(res.value)
		})
		.catch(res => toast(res.state, res.value));
	}, []);

	useEffect(() => {
		if (Object.keys(chats).length === 0) return;

		const researchRead = searchAmong(chats.read, ["name", "client.firstName", "client.lastName"], search, "i");
		const researchUnread = searchAmong(chats.unread, ["name", "client.firstName", "client.lastName"], search, "i");
		setChatsDisplay({
			read: [...new Set(researchRead)],
			unread: [...new Set(researchUnread)]
		});
	}, [search]);

	useEffect(() => {
		if (!searchbar.current) return;

		searchbar.current.focus();
	}, [searchbar]);


	return (
		<>
			<div id="researchClient" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__searchbar" style={{width: "calc(100% - 10px)"}}>
					<input
						type="search"
						value={search}
						placeholder="Search for a chat..."
						ref={searchbar}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						{
							chatsDisplay.length !== 0 ?
							["unread", "read"].map((list) => {
								if (chatsDisplay[list].length !== 0) {
									return (
										<div className="flex-row">
											<div className="vertical-line"></div>
											<div>
												<h3 className="widget-title">{list === "read" ? "Read" : "Unread"}</h3>
												<div className="flex-col sub-container">
													{
														chatsDisplay[list].map((elm) => {
															return (
																<Link to={`/chat/${elm.id}`}>
																	<div className="flex-row-between long-result" onClick={() => setDisplayWidget(false)}>
																		<div className="flex-col">
																			<p><b>{elm.client.lastName} {elm.client.firstName}: {elm.name}</b>
																				<sub>- {elm.date}</sub>
																			</p>
																			<p><i>{elm.lastMessage ? elm.lastMessage : "There are no messages sent in this chat yet."}</i></p>
																		</div>
																		<div>
																			<div className={ elm.client.online ? "online" : "offline" }></div>
																			<p>{ elm.client.online ? "Online" : "Offline" }</p>
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