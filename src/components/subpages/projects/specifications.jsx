import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import InputDropFile from '../../assets/inputDropFile';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// 	'pdfjs-dist/build/pdf.worker.min.mjs',
// 	import.meta.url,
// ).toString();


const Specifications = () => {
	const [numPages, setNumPages] = useState();

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

	const file = watch('file', '/C:/Users/Maxence/Desktop/programmation/projects/poulpidou/poulpidou - app/front-end-poulpidou/src/components/subpages/projects/test-pdf.pdf');

	const onLoadSuccess = ({ numPage }) => setNumPages(numPage);

	return (
		file === null ? <>
			<div className="grid-center specifications">
				<FormProvider {...methods}>
					<div style={{marginTop: "-100px"}}>
						<p style={{fontSize: "20px", textAlign: "center", fontStyle: "italic", margin: "0 0 20px 0"}}>No files found. But good knews, you can add one!</p>
						<InputDropFile />
					</div>
				</FormProvider>
			</div>
		</> : <>
			{/*<iframe src={file} width="800" height="600"/>*/}
			<Document 
				file={file}
				onLoadError={(error) => console.error('Error loading document:', error)}
				onLoadSuccess={onLoadSuccess}
			>
			{
				Array(numPages).fill().map((_, i) => (
					<Page pageNumber={i+1}></Page>
				))
			}
			</Document>
		</>
		
	);
}

export default Specifications;