import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {useToast} from '../../../hooks/useToast';
import {removeClient} from "../../../requests/clients/removeClient";

const Delete = () => {
    const {id} = useParams();

    const toast = useToast();


    const toRemoveClient = function () {
        removeClient(id)
            .then(res => {
                toast(res.state, "")
                window.location = "/clients"
            })
            .catch(res => toast(res.state, res.value))
    };

    return (
        <>
            <div className="flex-col-center alignCenter" style={{height: "100%", textAlign: "center"}}>

                <p style={{color: "var(--text-grey)",marginBottom:"30px"}}>Are you sure you want to delete this client? In case of an
                    error, please contact your database manager or the Poulpidou developers.</p>
                <button
                    onClick={() => toRemoveClient()}
                    className={"redButton"}
                >
                    Remove client
                </button></div>
            </>
            );
            }

export default Delete;