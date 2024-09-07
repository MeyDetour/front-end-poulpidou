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

            </div>
        </div>


    </>
    )

}

export default ClientAccess;