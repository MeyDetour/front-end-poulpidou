import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { Link } from 'react-router-dom';

const NewClient = () => {
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

	return (
		<>
			<div id="newClient" className="widget" onClick={(event) => event.stopPropagation()}>
				<form onSubmit={handleSubmit()} className="flex-col">
					<h2>New client</h2>
					<div className="flex-row">
						<p><b>First name*:</b></p>
						<input type="text" {...register("client.identity.firstName")}/>
					</div>
					<div className="flex-row">
						<p><b>Last name*:</b></p>
						<input type="text" {...register("client.identity.lastName")}/>
					</div>
					<div className="flex-row-between">
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Mail*:</b></p>
							<input type="mail" {...register("client.contact.mail")}/>
						</div>
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Phone*:</b></p>
							<input type="text" {...register("client.contact.phone")}/>
						</div>
					</div>
					<div className="flex-row-between">
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Job*:</b></p>
							<input type="text" {...register("client.info.job")}/>
						</div>
						<div className="flex-row" style={{width: "47%"}}>
							<p><b>Location:</b></p>
							<input type="text" {...register("client.info.location")}/>
						</div>
					</div>
					<div className="flex-col-between">
						<p><b>Notes:</b></p>
						<textarea name="" id=""></textarea>
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