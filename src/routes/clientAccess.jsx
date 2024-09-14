import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
import {useToast} from '../hooks/useToast';


import '../css/clientInterface.css';

import {getClientInterface} from "../requests/clientInterface/getClientInterface";
import {getChat} from "../requests/clientInterface/getChat";
import {sendMessage} from "../requests/clientInterface/sendMessage";
import {setOfflineOnline} from "../requests/clientInterface/setOfflineOnline";


const ClientAccess = () => {
    const [reload, setReload] = useState(0);

    const {uuid} = useParams();

    const toast = useToast();

    const [messages, setMessages] = useState([]);

    const [chat, setChat] = useState(null);
    const [client, setClient] = useState(null);
    const [data, setData] = useState(null);

    const optionAssociationName = {
        "mailServer": "Service d'envoi d'email",
        "phoneServer": "Envoi de message automatique",
        "payingMethods": "Méthodes de paiement",
        "account": "Gestion des comptes",
        "images": "Gestion des images"
    };
    const typeAssociationName = {
        "showcase": "Site vitrine",
        "eCommerce": "Site e-commerce",
        "software": "Logiciel",
        "app": "Application",
        "forum": "Forum de discussion",
        "blog": "Blog",
        "videoGame": "Jeu vidéo",
        "api": "API (Interface de Programmation)"
    };
    const deviceAssociationName = {
        "mobile": "Smart Phone",
        "computer": "Ordinateur",
        "television": "Télévision",
        "printer": "Impression"
    };
    const frameworkAssociationName = {
        "symfony": "Symfony",
        "django": "Django",
        "react": "React",
        "vue": "Vue.js",
        "angular": "Angular"
    };

    useEffect(() => {
        getClientInterface(uuid)
            .then(res => {
                setData(res.value);
                console.log(res.value)
            })
            .catch(res => toast(res.state, res.value));
        setOfflineOnline(true, uuid)
            .then(res => {
                console.log(res.value)
            })
            .catch(res => toast(res.state, res.value)
            );

        getChat(uuid)
            .then(res => {
                setChat(res.value.chat);
                setMessages(res.value.messages);
                setClient(res.value.client);
            })
            .catch(res => toast(res.state, res.value));

    }, []);
    
    const association = {
        "CHEQUE": "Chèque",
        "CASH": "Espèce",
        "BANKTRANSFER": "Virement",
    }
    const input = useRef();
    const scrollContainer = useRef();
    const isLastMessageOwn = useRef(false);
    const setOfflineBeforeUnload = ()=>{
        setOfflineOnline(false, uuid)
            .then(res => {
                console.log(res.value)
            })
            .catch(res => toast(res.state, res.value)
            );
    }
    const addMessage = () => {
        if (input.current === null) return;
        const content = input.current.value
        sendMessage(content, uuid)
            .then(res => {
                toast(res.state, "message send")
                setMessages([...messages, {
                    content: content,
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
                <Beforeunload onBeforeUnload={() => setOfflineBeforeUnload()}>

                <div className={"clientInterface"}>
                    <div className={"clientInterface-container flex-row"}>

                        <div className={"clientInterface-messagerie"}>
                            <div className="scroll-container clientInterface-messages" ref={scrollContainer}>

                                {
                                    messages.length > 0 ?
                                        messages.map((message, index) => {

                                            const isOwnMessage = message.author.id === client.id;
                                            console.log(message, isOwnMessage)
                                            console.log(message.author)
                                            isLastMessageOwn.current = isOwnMessage;

                                            return (
                                                <div
                                                    className={"flex-col " + (!isOwnMessage ? "user-message" : "client-message")}
                                                    key={index}>

                                                    <div className="message__head">

                                                        <h4>{!isOwnMessage ? message.author.lastName && message.author.firstName ? message.author.lastName + " " + message.author.firstName : message.author.email : "You"}</h4>

                                                        <p className={"message_date"}>{message.datetime}</p>
                                                    </div>
                                                    <p className={"message_content"}>{message.content}</p>

                                                </div>
                                            );
                                        }) : null
                                }
                                <p className={"placeholderOfChat"}>
                                    Project Chat: Discuss Here with Your Project Manager
                                </p>

                            </div>
                            <div className="flex-row chats-page__input">
                                <textarea ref={input}></textarea>
                                <img src="pictures/icons/send-messages-icon.svg" alt="Send"
                                     onClick={(e) => addMessage()}/>
                            </div>
                        </div>
                        <div className={"clientInterface-project-options"}>
                            {data.project?.database ||
                            data.project?.maquette ||
                            data.project?.maintenance ||
                            data.project?.options.length != 0 ||
                            data.project?.devices.length != 0 ||
                            data.project?.type.length != 0 ||
                            data.project?.framework.length != 0 ? <>

                                    {data.project?.type.length != 0 ?
                                        <>
                                            <div className={"oneDetail"}>
                                                <h4>Type</h4>
                                                <div className={"separateur"}></div>

                                                {
                                                    (data.project?.type).map((type, index) => {
                                                        return (<span key={index}>  {typeAssociationName[type]}</span>)
                                                    })
                                                }
                                            </div>

                                        </>
                                        : null
                                    } {data.project?.database || data.project?.options.length != 0 || data.project?.maquette || data.project?.maintenance ?
                                    <>
                                        <div className={"oneDetail"}>
                                            <h4>Options</h4>
                                            <div className={"separateur"}></div>
                                            {data.project?.database ?
                                                <span>Base de donnée</span> : null
                                            }
                                            {data.project?.maquette ?
                                                <span>Prototype & plan du site & design</span> : null
                                            }
                                            {data.project?.maintenance ?
                                                <span>Maintenance</span> : null
                                            }
                                            {data.project?.options.length != 0 ?
                                                (data.project?.options).map((option, index) => {
                                                    return (<span key={index}>  {optionAssociationName[option]}</span>)
                                                }) : null
                                            }
                                        </div>

                                    </>
                                    : null
                                }
                                    {data.project?.devices.length != 0 ?
                                        <>
                                            <div className={"oneDetail"}>
                                                <h4>Support compatible</h4>
                                                <div className={"separateur"}></div>

                                                {(data.project?.devices).map((device, index) => {
                                                    return (<span key={index}>  {deviceAssociationName[device]}</span>)
                                                })
                                                }
                                            </div>

                                        </>
                                        : null
                                    } {data.project?.framework.length != 0 ?
                                    <>
                                        <div className={"oneDetail"}>
                                            <h4>Technologie utilisé(s)</h4>
                                            <div className={"separateur"}></div>

                                            {(data.project?.framework).map((frame, index) => {
                                                return (<span key={index}>  {frameworkAssociationName[frame]}</span>)
                                            })
                                            }
                                        </div>

                                    </>
                                    : null
                                }
                                </> :
                                <><p className={"placeholderOfChat"}>Il n'y a aucun detail sur votre projet</p></>
                            }
                        </div>

                    </div>


                    <div className="clientInterface-container ">
                        <div className="clientInterface-payment-conditions">
                            <h3>Terms and Conditions</h3>

                            <section>
                                <span>Late Payment Consequences</span>
                                <p>In the event of a late payment, project delivery may be delayed, potentially
                                    extending
                                    beyond the originally agreed deadline.</p>
                            </section>
                            <section>
                                <span>Dispute Resolution</span>
                                <p>In case of disagreement, parties will attempt to resolve the issue amicably through
                                    discussion and negotiation. If unresolved, parties may choose to engage a neutral
                                    mediator or arbitrator to assist in resolving the dispute.</p>
                            </section>
                            <section>
                                <span>Project Cancellation</span>
                                <ul>
                                    <li><u>Full Refund:</u> If the project is canceled before work begins, a full refund
                                        may
                                        be issued.
                                    </li>
                                    <li><u>Partial Refund:</u> If the project is canceled after work has started, a
                                        partial
                                        refund reflecting the work completed may be considered.
                                    </li>
                                    <li><u>No Refund:</u> No refund may be provided if a significant portion of the
                                        project
                                        has been completed.
                                    </li>
                                </ul>
                            </section>
                            <section>
                                <span>Non-Payment</span>
                                <p>In case of non-payment, no penalty fees will be charged, but services will be
                                    suspended
                                    until payment is received.</p>
                            </section>
                            <section>
                                <span>Confidentiality Agreements</span>
                                <p>Both parties agree to maintain confidentiality of all proprietary and sensitive
                                    information disclosed during the project. This agreement remains in effect even
                                    after
                                    the project is completed.</p>
                            </section>
                            <section>
                                <span>Contract Termination Conditions</span>
                                <p><u>Breach of Contract:</u> The contract may be terminated if either party fails to
                                    meet
                                    its obligations, including:</p>
                                <ul>
                                    <li>Non-payment by the client.</li>
                                    <li>Failure to deliver services by the provider as agreed upon.</li>
                                    <li>Breach of confidentiality agreements.</li>
                                </ul>
                                <p><u>Mutual Agreement:</u> The contract can be terminated at any time if both parties
                                    agree.</p>
                            </section>
                            <section>
                                <span>Payment Milestones</span>
                                <ul>
                                    <li><u>Initial Deposit:</u> A percentage of the total cost paid upfront to initiate
                                        the
                                        project.
                                    </li>
                                    <li><u>Progress Payments:</u> Payments made at specific stages of project completion
                                        (e.g., 25%, 50%, and 75% completion).
                                    </li>
                                    <li><u>Final Payment:</u> The remaining balance is due upon project completion and
                                        client approval.
                                    </li>
                                </ul>
                            </section>
                        </div>
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
                        <span>{data.project?.price && data.project?.isPaying ? "Prix total : " + data.project?.price : ""}</span>
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
                </Beforeunload>
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


