import React, {useEffect, useState} from 'react';

import {getClients} from "../../../requests/widgets/getClients";
import {useToast} from '../../../hooks/useToast';
import {getLogs} from "../../../requests/globals/getLogs";
import {getCurrentUser} from "../../../requests/settings/getCurrentUser";
import {useForm} from "react-hook-form";
import {putSettings} from "../../../requests/settings/putSettings";
import {putCurrentUser} from "../../../requests/settings/putCurrentUser";
import {importData} from "../../../requests/settings/importData";
import {exportData} from "../../../requests/settings/exportData";

const Logs = () => {
    const [reset, setReset] = useState(false);
    const [urlExport, setUrlExport] = useState(false);

    const toast = useToast();

    useEffect(() => {
        getCurrentUser()
            .then(res => {

                setValue("phone", res.value.phone)
                setValue("siret", res.value.siret)
                setValue("address", res.value.address)
                setValue("firstName", res.value.firstName)
                setValue("lastName", res.value.lastName)
                setReset(false)

            })
            .catch(res => toast(res.state, res.value));


    }, [reset])
    useEffect(() => {
        exportData()
            .then(response => {
                console.log(response.value.fileUrl)
                setUrlExport(response.value.filePath)
            })  // Récupérer le fichier sous forme de Blob

            .catch(res => toast(res.state, res.value));
    }, [])


    const onError = (error) => {
        if (error.title) return toast("warning", "The names fields and email field are required.");
    }

    const formMethods = useForm();
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        setValue,
        setError, getValues,
        clearErrors,
        watch,
    } = formMethods;

    const onSubmit = (data) => {
        console.log(data)
        if (data == undefined) return toast("error", "Please reload the page, an error occured");

        putCurrentUser(data)
            .then(res => {
                toast(res.state, res.value)
                setReset(true)
            })
            .catch(res => toast(res.state, res.value));
    }
    const exportDataFct = () => {

        console.log("to export data")
        exportData()
            .then(response => {
                const url =  response.value.fileUrl;
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', response.value.fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                toast(response.state,"Data Exported")
            })  // Récupérer le fichier sous forme de Blob

            .catch(res => toast(res.state, res.value));
    }
    const importDataFct = () => {
        importData()
            .then(res => {
                toast(res.state, res.value)
                setReset(true)
            })
            .catch(res => toast(res.state, res.value));
    }

    return (
        <>
            <div className="scroll-container" style={{height: "100%"}}>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex-col"
                      style={{height: "100%", gap: "30px"}}>
                    <h2>Edit client profile</h2>

                    <div className="flex-row">
                        <p className="text-of-input" title="This field is required"><b>First name: </b></p>
                        <input type="text" {...register("firstName", {required: true})}/>
                    </div>
                    <div className="flex-row">
                        <p className="text-of-input" title="This field is required"><b>Last name: </b></p>
                        <input type="text" {...register("lastName", {required: true})}/>
                    </div>
                    <div className="flex-row-between">

                        <div className="flex-row" style={{width: "47%"}}>
                            <p className="text-of-input" title="Type siret here"><b>Phone: </b></p>
                            <input type="text" {...register("phone")}/>
                        </div>
                        <div className="flex-row" style={{width: "47%"}}>
                            <p className="text-of-input" title="Type siret here"><b>Siret: </b></p>
                            <input type="text" {...register("siret", {required: false})}/>
                        </div>
                    </div>
                    <div className="flex-row-between">

                        <div className="flex-row" style={{width: "47%"}}>
                            <p className="text-of-input" title="Type siret here"><b>Address: </b></p>
                            <input type="text" {...register("address")}/>
                        </div>
                    </div>


                    <div className={"flex-row-between"}>
                        <div className="flex-row" style={{marginBottom: "20px", gap: "10px"}}>
                            <input type="submit" value="Save changes"/>
                            <input type="reset" className="resetButton" onClick={() => setReset(true)}
                                   value="Abort changes"/>
                        </div>
                        <div className="flex-row" style={{marginBottom: "20px", gap: "10px"}}>
                            <a download={"https://poulpi-back.md-genos.com/exportData/20240917125436.json"} href="/settings/profile">click here</a>
                            <button onClick={() => exportDataFct()}>Export Data</button>
                            <button>Import Data</button>

                        </div>
                    </div>
                    <button type="reset" onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem("token");
                    }}>Disconnect
                    </button>
                </form>
            </div>
        </>
    );
}

export default Logs;