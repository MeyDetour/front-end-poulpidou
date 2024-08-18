import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllChats = () => {
	const [chats, setChats] = useState([{
		id: 0,
		name: "F&B-Database",
		lastMessage: {
			content: "Lorem ipsum laborum et aute sint elit culpa consectetur irure minim non sed ut nulla.",
			date: "17/08/2024",
			time: "10:50"
		}
	}, {
		id: 0,
		name: "Poulpidou",
		lastMessage: {
			content: "Lorem ipsum anim incididunt laborum minim dolor velit enim veniam irure duis labore.",
			date: "18/08/2024",
			time: "08:00"
		}
	}]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col" style={{gap: "10px"}}>
					{
						chats.length !== 0 ?
						chats.map((chat) => {
							return (
								<Link>
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