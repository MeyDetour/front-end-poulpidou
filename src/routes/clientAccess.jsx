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


    return(

    <>
        <div className={"clientInterface"}>
            <div className={"clientInterface-project-data"}>
              <h2>{data.project?.name}</h2>
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
					

              	*/}
            </div>
        </div>


    </>
    )

}

export default ClientAccess;