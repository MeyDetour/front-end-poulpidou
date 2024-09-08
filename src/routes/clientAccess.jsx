import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {useToast} from '../hooks/useToast';


import '../css/clientInterface.css';

import EditProfile from '../components/subpages/clients/editProfile';
import AllChats from '../components/subpages/clients/allChats';
import AllProjects from '../components/subpages/clients/allProjects';
import AllInvoices from '../components/subpages/clients/allInvoices';

import ResearchClient from '../components/widgets/researchClient';
import Delete from "../components/subpages/clients/delete";
import NewClient from "../components/widgets/newClient";
import {getClientInterface} from "../requests/clients/getClientInterface";

const ClientAccess = () => {
    const [reload, setReload] = useState(0);

    const {uuid} = useParams();

    const toast = useToast();

    const [data, setData] = useState({});

    useEffect(() => {
        getClientInterface(uuid)
            .then(res => {
                setData(res.value);
                console.log(res.value)
            })
            .catch(res => toast(res.state, res.value));
    }, []);


    return (

        <>
            <div className={"clientInterface"}>
                <div className={"clientInterface-project-data"}>
                    <h1>{data.project?.name}</h1>

                    <h4>Responsable du projet</h4>
                    <span>{data.projectOwner?.firstName && data.projectOwner?.lastName ? data.projectOwner?.firstName + " " + data.projectOwner?.lastName : ""}</span>
                    <span>{data.projectOwner?.mail}</span>
                    <span>{data.projectOwner?.phone ? data.projectOwner?.phone : ""}</span>
                    <span>{data.projectOwner?.siret ? "Siret : " + data.projectOwner?.siret : ""}</span>

                    {data.project?.startDate || data.project?.endDate || data.project?.price ? <>
                            <h4>Le projet</h4>
                            <span>{data.project?.startDate ? "Début :" + data.project?.startDate : ""}</span>
                            <span>{data.project?.endDate ? "Fin :" + data.project?.endDate : ""}</span>
                            <span>{data.project?.price ? "Prix total :" + data.project?.price : ""}</span>
                            <span>{data.project?.maintenancePercentage && data.project?.price ? "Prix de la maintenance :" + (data.project?.price * data.project?.maintenancePercentage) / 100 + "€/an" : ""}</span>
                        </>
                        : null}

                </div>
            </div>


        </>
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


