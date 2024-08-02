import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";

import Axios from 'axios';
// import https from 'https-browserify';

import { Link } from 'react-router-dom';

import InputDropFile from '../assets/inputDropFile';

const AddSpecifications = () => {
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

	console.log(dropFileInput)

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append('pdf', data.file[0]);

		console.log(formData.get('pdf'))

		Axios.post(`https://192.168.1.135:8000/upload/pdf`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			// httpsAgent: agent
		})
		.then(response => {
			console.log('File uploaded successfully', response.data);
		})
		.catch(error => {
			console.error('Error uploading file', error);
		});
	}

	return (
		<>
			<div id="addSpecifications" className="widget" onClick={(event) => event.stopPropagation()}>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)} className="flex-col" onChange={(e) => console.log(getValues())}>
						<h2>Upload technical specifications</h2>
						<InputDropFile />
						<div>
							<input type="submit" value="Upload file" disabled={!dropFileInput} />
							{
								dropFileInput !== null ? <button onClick={() => setValue('file', null)}>Delete file</button> : null
							}
						</div>
					</form>
				</FormProvider>
			</div>
		</>
	);
}

export default AddSpecifications;