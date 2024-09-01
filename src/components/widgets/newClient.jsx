import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { useToast } from '../../hooks/useToast';
import {newClient} from "../../requests/clients/newClient";

const NewClient = ({setDisplayWidget }) => {

	const toast = useToast();
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
	} = useForm();

	const onError = (error) => {
		if (error.title) return toast("warning", "The names fields and email field are required.");
	}

	const onSubmit = (data) => {

		data = data.client
		if (data.identity.firstName != null &&  data.identity.lastName!= null && data.contact.mail != null) {
			newClient(data)
				.then(res => {

					toast("OK", "The operation was successful.");

					setDisplayWidget("allClients");
				})
				.catch(res => toast(res.state, res.value));
		} else {
			toast("warning", "The names fields and email field are required.")
		}

	}
	return (
		<>
			<div id="newClient" className="widget" onClick={(event) => event.stopPropagation()}>
				<form onSubmit={handleSubmit(onSubmit,onError)} className="flex-col">
					<h2>New client</h2>
					<div className="flex-row">
						<p><b>First name*:</b></p>
						<input type="text" {...register("client.identity.firstName",{required: true})}/>
					</div>
					<div className="flex-row">
						<p><b>Last name*:</b></p>
						<input type="text" {...register("client.identity.lastName",{required: true})}/>
					</div>
					<div className="flex-row-between">
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Mail*:</b></p>
							<input type="mail" {...register("client.contact.mail",{required: true})}/>
						</div>
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Phone:</b></p>
							<input type="text" {...register("client.contact.phone")}/>
						</div>
					</div>
					<div className="flex-row-between">
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Job:</b></p>
							<input type="text" {...register("client.info.job")}/>
						</div>
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Location:</b></p>
							<input type="text" {...register("client.info.location")}/>
						</div>
					</div>
					<div className="flex-row-between">
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Siret:</b></p>
							<input type="text" {...register("client.info.siret")}/>
						</div>

					</div>
					<div className="flex-col-between">
						<p><b>Notes:</b></p>
						<textarea {...register("client.note")} id=""></textarea>
					</div>
					<div>
						<input type="submit" value="Create new client"/>
					</div>
				</form>
			</div>
		</>
	);
}

export default NewClient;