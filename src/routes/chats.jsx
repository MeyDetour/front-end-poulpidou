import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// TODO: Augment textarea height when press enter && set the right date/time when send a message

import '../css/chats.css';

import ResearchClientChat from '../components/widgets/researchClientChat';
import {getChats} from "../requests/globals/getChats";
import {toast} from "react-toastify";
import {getChat} from "../requests/globals/getChat";

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

	const [chat, setChat] = useState({});
	const [client, setClient] = useState({});

	const [messages, setMessages] = useState([]);

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

	useEffect(() => {
		getChat(id)
			.then(res => {
				setClient(res.value.client);
			 	setChat(res.value.client);
				setMessages(res.value.messages);

			})
			.catch(res => toast(res.state, res.value));
	}, [])

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
									<b> {/*- {client.currentProjects} current project{client.currentProjects == 1 ? null : ""}*/}  </b>
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