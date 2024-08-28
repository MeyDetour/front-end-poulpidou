import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useToast } from '../../../hooks/useToast';

import { getClientChats } from '../../../requests/clients/getClientChats';

import { useParams } from 'react-router-dom';

const AllChats = () => {
	const { id } = useParams();

	const toast = useToast();

	const [chats, setChats] = useState([]);

	useEffect(() => {
		if (id == undefined) return;

		getClientChats(id)
		.then(res => setChats(res.value))
		.catch(res => toast(res.state, res.value));
	}, [id]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col" style={{gap: "10px"}}>
					{
						chats.length !== 0 ?
						chats.map((chat) => {
							return (
								<Link to={`/chats/${chat.id}`}>
									<div className="flex-col chat" style={{gap: "5px"}}>
										<div className="flex-row-between">
											<p className="chat__name">{chat.name}</p>
											<p className="chat__last-message-date">{chat.lastMessage.date} {chat.lastMessage.time}</p>
										</div>
										<p className="chat__last-message">{chat.lastMessage.content}</p>
									</div>
								</Link>
							)
						}) : null
					}
				</div>
			</div>
		</>
	);
}

export default AllChats;