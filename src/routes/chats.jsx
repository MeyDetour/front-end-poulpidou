import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// TODO: Augment textarea height when press enter && set the right date/time when send a message

import '../css/chats.css';

import ResearchClientChat from '../components/widgets/researchClientChat';
import { getUser } from "../requests/globals/getUser";
import { getChats } from "../requests/globals/getChats";
import { useToast } from "../hooks/useToast";
import { getChat } from "../requests/globals/getChat";
import {sendMessage} from "../requests/globals/sendMessage";

const Chats = (props) => {
	const { id } = useParams();

	const toast = useToast();

	const [displayWidget, setDisplayWidget] = useState(id == undefined);

	const toogleDisplayWidget = () => {
		if (id == undefined) return;
		setDisplayWidget(!displayWidget);
	}

	const [userID, setUserID] = useState(null);
	const user_firstName = " ";
	const user_lastName = " ";

	const [chat, setChat] = useState({});
	const [client, setClient] = useState({});

	const [messages, setMessages] = useState([]);

	const addMessage = () => {
		if (input.current === null) return;
		if (userID === null) return toast("error", "An error occured, please reload the page.");


		
		sendMessage(input.current.value,chat.project_id)
			.then(res => {
				console.log(res.value)
				toast(res.state, "message send")
				setMessages([...messages, {
					content: res.value.content,
					datetime: res.value.datetime,
					author: {
						id: res.value.author.id,
						firstName: res.value.author.firstName,
						lastName: res.value.author.lastName,
					}
				}]);
			})
			.catch(res => toast(res.state, res.value));

		input.current.value = ""
	}

	useEffect(() => {
		getUser()
		.then(res => setUserID(res.value.id))
		.catch(res => toast(res.state, res.value));
	}, []);

	useEffect(() => {
		if (id == undefined) return;

		getChat(id)
		.then(res => {
			setClient(res.value.client);
		 	setChat(res.value.chat);
			setMessages(res.value.messages);

		})
		.catch(res => toast(res.state, res.value));
	}, [id]);

	const input = useRef();
	const scrollContainer = useRef();
	const isLastMessageOwn = useRef(false);

	useEffect(() => {
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