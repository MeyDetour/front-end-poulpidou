import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from "react-hook-form";

import { useToast } from '../../../hooks/useToast';

import { useParams } from 'react-router-dom';

import { getClient } from '../../../requests/clients/getClient';
import { putClient } from '../../../requests/clients/putClient';

const EditProfile = ({ data, reload, setReload }) => {
	const { id } = useParams();

	const toast = useToast();

	const [reset, setReset] = useState(false);
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

	useEffect(() => {
		console.log(data);

		let values = {};

		if (data == undefined || reset) {
			getClient(id)
			.then(res => {
				values["firstName"] = res.value.firstName;
				values["lastName"] = res.value.lastName;
				values["mail"] = res.value.mail;
				values["phone"] = res.value.phone;
				values["job"] = res.value.job;
				values["location"] = res.value.location;
				values["siret"] = res.value.siret;
				setReset(false)
			})
			.catch(res => toast(res.state, res.value));
		} else { values = data; }

		Object.keys(values).forEach(key => {
			setValue(key, values[key]);
		});
	}, [data,reset]);

	const onSubmit = (data) => {
		if (data == undefined) return toast("error", "Please reload the page, an error occured");

		if (!(data.mail)) return toast("warning", "Mail must be field.");

		putClient(data, id)
		.then(res => {
			toast(res.state, res.value);
			setReload(reload + 1)
		})
		.catch(res => toast(res.state, res.value));
	}

	const onError = (err) => {
		if (err.firstName) toast("warning", "First name is required.");
		if (err.lastName) toast("warning", "Last name is required.");
		if (err.job) toast("warning", "The job field is required.");
	}

	return (
		<>	
			<div className="scroll-container" style={{height: "100%"}}>
				<form onSubmit={handleSubmit(onSubmit, onError)} className="flex-col"
					  style={{height: "100%", gap: "30px"}}>
					<h2>Edit client profile</h2>

					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>First name*: </b></p>
						<input type="text" {...register("lastName", {required: true})}/>
					</div>
					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>Last name*: </b></p>
						<input type="text" {...register("firstName", {required: true})}/>
					</div>
					<div className="flex-row-between">
						<div className="flex-row">
							<p className="text-of-input" title="This field is required"><b>Email*: </b></p>
							<input type="text" {...register("mail", {required: true})}/>
						</div>
						<div className="flex-row">
							<p className="text-of-input" ><b>Phone : </b></p>
							<input type="text" {...register("phone")}/>
						</div>
					</div>
					<div className="flex-row-between">
						<div className="flex-row">
							<p className="text-of-input" ><b>Job : </b></p>
							<input type="text" {...register("job", {required: false})}/>
						</div>
						<div className="flex-row">
							<p className="text-of-input" ><b>Location : </b></p>
							<input type="text" {...register("location")}/>
						</div>
					</div>
					<div className="flex-row-between">
						<div className="flex-row" style={{width: "47%"}}>
							<p className="text-of-input" ><b>Siret : </b></p>
							<input type="text" {...register("siret")}/>
						</div>

					</div>
					<div className="flex-col" style={{height: "100%"}}>
						<p className="text-of-input"><b>Notes: </b></p>
						<textarea name="" id="" style={{height: "100%"}}></textarea>
					</div>
					<div className="flex-row" style={{marginBottom: "20px", gap: "10px"}}>
						<input type="submit" value="Save changes"/>
						<input type="reset" className={"resetButton"} onClick={() => setReset(true)}
							   value="Abort changes"/>

					</div>
				</form>
			</div>
		</>
	);
}

export default EditProfile;