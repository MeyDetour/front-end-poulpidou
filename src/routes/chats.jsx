import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// TODO: Augment textarea height when press enter && set the right date/time when send a message

import '../css/chats.css';

import ResearchClientChat from '../components/widgets/researchClientChat';

const Chats = (props) => {
	const { id } = useParams();
	const [displayWidget, setDisplayWidget] = useState(id == undefined);

	const toogleDisplayWidget = () => {
		if (id == undefined) return;
		setDisplayWidget(!displayWidget);
	}

	console.log(displayWidget)

	const userID = 0;
	const user_firstName = "Maxence";
	const user_lastName = "ABRILE";

	const [client, setClient] = useState({
		id: "",
		firstName: "Maxence",
		lastName: "ABRILE",
		online: false,
		date: "12/08/2023",
		currentProjects: 0
	});

	const [messages, setMessages] = useState([{
		content: "Cillum in elit occaecat ut sunt ut cupidatat nostrud consectetur ad ut ea ad aliquip pariatur dolor.",
		datetime: "02/08/2024 15:10",
		author: {
			id: 0,
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Cillum in elit occaecat ut sunt ut cupidatat nostrud consectetur ad ut ea ad aliquip pariatur dolor.",
		datetime: "02/08/2024 15:10",
		author: {
			id: 0,
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Cillum in elit occaecat ut sunt ut cupidatat nostrud consectetur ad ut ea ad aliquip pariatur dolor.",
		datetime: "02/08/2024 15:10",
		author: {
			id: 0,
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	}, {
		content: "Cillum in elit occaecat ut sunt ut cupidatat nostrud consectetur ad ut ea ad aliquip pariatur dolor.",
		datetime: "02/08/2024 15:10",
		author: {
			id: 0,
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}, {
		content: "Amet sit laboris veniam nostrud cillum do incididunt est deserunt deserunt dolor et. Lorem ipsum in nulla dolore dolor amet elit consequat ex labore fugiat.",
		datetime: "02/08/2024 16:00",
		author: {
			id: 1,
			firstName: "Mey",
			lastName: "DETOUR",
		}
	},{
		content: "Cillum in elit occaecat ut sunt ut cupidatat nostrud consectetur ad ut ea ad aliquip pariatur dolor.",
		datetime: "02/08/2024 15:10",
		author: {
			id: 0,
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}]);

	const addMessage = () => {
		if (input.current === null) return;

		setMessages([...messages, {
			content: input.current.value,
			datetime: "02/08/2024 16:00",
			author: {
				id: userID,
				firstName: user_firstName,
				lastName: user_lastName,
			}
		}]);
	}

	const input = useRef();
	const scrollContainer = useRef();
	const isLastMessageOwn = useRef(false);

	useEffect(() => {
		console.log(scrollContainer.current)
		if (scrollContainer.current === null || !scrollContainer.current) return;
		scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
	}, [scrollContainer.current]);

	return (
		<>
			{
				typeof id !== "undefined" ? 
				<>
					<div className="flex-row-between chats-page__header">
						<div className="flex-col">
							<div className="flex-row">
								<h3>{client.lastName} {client.firstName}</h3>
								<div className="flex-row">
									<div className={client.online ? "online" : "offline"}></div> 
									<p>{ client.online ? "Online" : "Offline" }</p>
								</div>
							</div>
							<p>
								<sub style={{fontWeight: "normal"}}>Since {client.date} 
									<b> - {client.currentProjects} current project{client.currentProjects == 1 ? null : "s"}</b>
								</sub>
							</p>
						</div>
						<button onClick={() => setDisplayWidget(true)}>
							<img src="pictures/icons/contacts-icon.svg" alt="Contacts"/>
						</button>
					</div>
					<div className="horizontal-line"></div>
					<div className="scroll-container chats-page__content" ref={scrollContainer}>
						{
							messages.length > 0 ?
							messages.map((message, index) => {
								const isOwnMessage = message.author.id === userID;
								const needToDisplayName = isLastMessageOwn.current !== isOwnMessage;

								isLastMessageOwn.current = isOwnMessage;

								return (
									<div className={"flex-col " + (!isOwnMessage ? "left-message" : "right-message")} key={index}>
										{
											needToDisplayName ? 
												<h4>{!isOwnMessage ? message.author.lastName + " " + message.author.firstName : "You"}</h4>
											: null
										}
										<div className="message">
											<div className="message__content">
												<p>{message.content}</p>
											</div>
											<div className="message__datetime">
												<p>{message.datetime}</p>
											</div>
										</div>
									</div>
								);
							}) : null
						}
					</div>
					<div className="flex-row chats-page__input">
						<textarea ref={input}></textarea>
						<img src="pictures/icons/send-messages-icon.svg" alt="Send" onClick={(e) => addMessage()}/>
					</div>
				</> 
				: null
			}
			{
				displayWidget || id == undefined ? 
				<>
					<div 
						id="insideWidget"
						className="grid-center"
						onClick={toogleDisplayWidget}
						style={{cursor: typeof id === "undefined" ? "default" : "cursor", marginLeft: "-20px"}}
					>
						<ResearchClientChat setDisplayWidget={setDisplayWidget} />
					</div>
				</> : null
			}
		</>
	);
}	

export default Chats;