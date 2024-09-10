import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {useToast} from '../hooks/useToast';


import '../css/clientInterface.css';

import EditProfile from '../components/subpages/clients/editProfile';
import AllChats from '../components/subpages/clients/allChats';
import AllProjects from '../components/subpages/clients/allProjects';
import AllInvoices from '../components/subpages/clients/allInvoices';

import ResearchClient from '../components/widgets/researchClient';
import Delete from "../components/subpages/clients/delete";
import NewClient from "../components/widgets/newClient";
import {getClientInterface} from "../requests/clientInterface/getClientInterface";
import {getChat} from "../requests/clientInterface/getChat";
import {sendMessage} from "../requests/clientInterface/sendMessage";


const ClientAccess = () => {
    const [reload, setReload] = useState(0);

    const {uuid} = useParams();

    const toast = useToast();

    const [messages, setMessages] = useState([]);

    const [chat, setChat] = useState(null);
    const [client, setClient] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        getClientInterface(uuid)
            .then(res => {
                setData(res.value);
                console.log(res.value)
            })
            .catch(res => toast(res.state, res.value));
        getChat(uuid)
            .then(res => {
                setChat(res.value.chat);
                setMessages(res.value.messages);
                setClient(res.value.client);
            })
            .catch(res => toast(res.state, res.value));

    }, []);
    console.log(chat)
    console.log(client)
    console.log(messages)
    const association = {
        "CHEQUE": "Chèque",
        "CASH": "Espèce",
        "BANKTRANSFER": "Virement",
    }
    const input = useRef();
    const scrollContainer = useRef();
    const isLastMessageOwn = useRef(false);
    const addMessage = () => {
        if (input.current === null) return;


        sendMessage(input.current.value, uuid)
            .then(res => {
                toast(res.state, "message send")
                setMessages([...messages, {
                    content: input.current.value,
                    datetime: "02/08/2024 16:00",
                    author: {
                        id: client.id,
                        firstName: client.firstName,
                        lastName: client.lastName,
                    }
                }]);
            })
            .catch(res => toast(res.state, res.value));

        input.current.value = ""
    }

    return (
        chat && data ?
            <>
                <div className={"clientInterface"}>

                    <div className={"clientInterface-messagerie"}>
                        <div className=" clientInterface-messages" ref={scrollContainer}>
                            {
                                messages.length > 0 ?
                                    messages.map((message, index) => {

                                        const isOwnMessage = message.author.id === client.id;
                                        const needToDisplayName = isLastMessageOwn.current !== isOwnMessage;
                                        console.log(message, isOwnMessage)
                                        console.log(message.author)
                                        isLastMessageOwn.current = isOwnMessage;

                                        return (
                                            <div
                                                className={"flex-col " + (!isOwnMessage ? "user-message" : "client-message")}
                                                key={index}>

                                                <div className="message__head">

                                                    <h4>{!isOwnMessage ? message.author.lastName + " " + message.author.firstName : "You"}</h4>

                                                    <p className={"message_date"}>{message.datetime}</p>
                                                </div>
                                                <p className={"message_content"}>{message.content}</p>

                                            </div>
                                        );
                                    }) : null
                            }
                        </div>
                        <div className="flex-row chats-page__input">
                            <textarea ref={input}></textarea>
                            <img src="pictures/icons/send-messages-icon.svg" alt="Send" onClick={(e) => addMessage()}/>
                        </div>
                    </div>
                    <div className={"clientInterface-proj!ect-options"}>

                    </div>

                    <div className={"clientInterface-project-data"}>
                        <h2 className={"title"}>{data.project?.name}</h2>

                        <h2>Responsable du projet</h2>
                        <span>{data.projectOwner?.firstName && data.projectOwner?.lastName ? data.projectOwner?.firstName + " " + data.projectOwner?.lastName : ""}</span>
                        <span>{data.projectOwner?.mail}</span>
                        <span>{data.projectOwner?.phone ? data.projectOwner?.phone : ""}</span>
                        <span>{data.projectOwner?.siret ? "SIRET : " + data.projectOwner?.siret : ""}</span>

                        <h2>Le projet</h2>
                        <span>{data.project?.startDate ? "Début : " + data.project?.startDate : "Aucune date de début spécifiée"}</span>
                        <span>{data.project?.endDate ? "Fin : " + data.project?.endDate : "Aucune date de fin spécifiée"}</span>
                        <span>{data.project?.price ? "Prix total : " + data.project?.price : ""}</span>
                        <span>{data.project?.maintenancePercentage && data.project?.price ? "Prix de la maintenance : " + (data.project?.price * data.project?.maintenancePercentage) / 100 + " €/an" : ""}</span>

                        <h2>Modalités de paiement</h2>
                        <span>Paiement en plusieurs fois {data.modalites?.installmentPayments ? "" : "non"} acceptés</span>
                        <span>{data.modalites?.freeMaintenance ? "Maintenance gratuite la première année" : ""}</span>
                        <span>{data.modalites?.delayDays ? "Paiement sous " + data.modalites?.delayDays + " jours" : ""}</span>
                        <span>{data.modalites?.payments.length !== 0
                            ? "Moyens de paiements acceptés : " + data.modalites?.payments.map((methode, index) => association[methode] || methode).join(", ")
                            : ""}</span>
                    </div>
                </div>


            </> :
            <h1 className={"resetButton"}>Aucun projet disponible. <br/> Le projet que vous recherchez n'existe pas ou a
                été
                supprimé.</h1>

    )

}
{/*


					JE T'AIME NAMOURE
					T'ES UNE BONNE DEV

					ET T'ES MAGNIFIQUE AUSSI !!

					MERCI POUR TOUT CE QUE TU FAIS POUR MOI
					ET TOUT CE QUE TU M'APPORTES

					TU ES TRES IMPORTANTE POUR MOI
					ET TU COMPTES ENORMEMENT DANS MA VIE

					NE DOUTE PAS DE TA GENIALITUDE
					PARCE QUE JE SUIS CONFRONTE A CA TOUT LES JOURS
					ET C'EST UNE INCROYABLE EXPERIENCE

					ENCORE UNE FOIS


					JE T'AIME !


              	*/
}
export default ClientAccess;


