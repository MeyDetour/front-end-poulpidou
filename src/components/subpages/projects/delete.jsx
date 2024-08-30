import React, {useState, useEffect, useRef} from 'react';
import {useForm, FormProvider} from "react-hook-form";
import {useParams} from 'react-router-dom';

import {getInvoices} from '../../../requests/projects/getInvoices';

import InputCheckbox from '../../assets/inputCheckbox';

import {useToast} from '../../../hooks/useToast';
import {removeProject} from "../../../requests/projects/removeProject";

const Delete = () => {
    const {id} = useParams();

    const toast = useToast();


    const toRemoveProject = function () {
        removeProject(id)
            .then(res => {
                toast(res.state, "")
                window.location = "/projects"
            })
            .catch(res => toast(res.state, res.value))
    };

    return (
        <>
            <div className="flex-col-center alignCenter" style={{height: "100%", textAlign: "center"}}>

                <p style={{color: "var(--text-grey)",marginBottom:"30px"}}>Are you sure you want to delete this project? In case of an
                    error, please contact your database manager or the Poulpidou developers.</p>
                <button
                    onClick={() => toRemoveProject()}
                    className={"redButton"}
                >
                    Remove project
                </button></div>
            </>
            );
            }

            export default Delete;