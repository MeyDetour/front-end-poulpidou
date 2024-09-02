import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from "react-hook-form";

import {useToast} from '../../../hooks/useToast';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';

import InputDropFile from '../../assets/inputDropFile';
import Axios from "axios";
import {postTask} from "../../../requests/projects/postTask";
import {uploadSpecification} from "../../../requests/projects/uploadSpecification";
import {useParams} from "react-router-dom";
import {getClient} from "../../../requests/clients/getClient";
import {getSpecification} from "../../../requests/projects/getSpecification";
import {deleteSpecification} from "../../../requests/projects/deleteSpecification";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// 	'pdfjs-dist/build/pdf.worker.min.mjs',
// 	import.meta.url,
// ).toString();


const Specifications = () => {
    const [numPages, setNumPages] = useState();
    const [reload, setReload] = useState(0);
    const {id} = useParams();
    const toast = useToast();

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    /*const file = watch('file', '/C:/Users/Maxence/Desktop/programmation/projects/poulpidou/poulpidou - app/front-end-poulpidou/src/components/subpages/projects/test-pdf.pdf');
*/
    const onLoadSuccess = ({numPage}) => setNumPages(numPage);

    const methods = useForm();
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
    } = methods;

    // const agent = new https.Agent({
    // 	rejectUnauthorized: false
    // });

    const dropFileInput = watch('file', null);

    useEffect(() => {
        getSpecification(id)
            .then(res => {
                console.log("reload : ",reload)
                 if(res.value.filePath!==null){
                     setFile(process.env.REACT_APP_API_ADRESS+'/'+res.value.filePath);
                     setFileName(res.value.fileName);
                 }

            })
            .catch(res => toast(res.state, res.value));
    }, [reload])
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('pdf', data.file[0]);

        uploadSpecification(formData, id)
            .then(res => {
                toast("OK", "The operation was successful.");
                setReload(reload+1)
            })
            .catch(res => toast(res.state, res.value));
    }

  const deletePdf = () => {
      console.log('to delete')
        deleteSpecification(id)

            .then(res => {
                console.log("deleted")
                toast("OK", "The operation was successful.");
                setReload(reload+1)
                setFileName(null)
                setFile(null)
            })
            .catch(res => toast(res.state, res.value));
    }


    return (
        file === null ? <>
            <div className="grid-center specifications">

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-col"
                          onChange={(e) => console.log(getValues())}>
                        <p style={{fontSize: "20px", textAlign: "center", fontStyle: "italic", margin: "0 0 20px 0"}}>No
                            files found. But good knews, you can add one!</p>

                        <InputDropFile/>
                        <div style={{marginTop: "20px"}} className={"flex-row-between"}>
                            <input type="submit" value="Upload file" disabled={!dropFileInput}/>
                            {
                                dropFileInput !== null ?
                                    <button className={"resetButton"} onClick={() => setValue('file', null)}>Delete
                                        file</button> : null
                            }
                        </div>
                    </form>
                </FormProvider>
            </div>
        </> : <>
            <div className="grid-center" style={{marginBottom: "20px"}}>
                <div className="flex-row-between">
                    <img src="pictures/icons/trash.svg" onClick={()=>deletePdf()} alt="trash" style={{margin: "auto"}}/>
                    <p style={{fontSize: "20px", textAlign: "center", fontStyle: "italic", margin: "0"}}>The file is
                        open: {fileName}</p>
                </div>
            </div>
            <iframe src={file} width="100%" height="100%"/>
            {/*<Document
				file={file}
				onLoadError={(error) => console.error('Error loading document:', error)}
				onLoadSuccess={onLoadSuccess}
			>
			{
				Array(numPages).fill().map((_, i) => (
					<Page pageNumber={i+1}></Page>
				))
			}
			</Document>*/}
        </>

    );
}

export default Specifications;