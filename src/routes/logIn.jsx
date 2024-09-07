import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useToast } from '../hooks/useToast';

import { logIn } from '../requests/users/logIn';

const LogIn = () => {
	const toast = useToast();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = (data) => {
		logIn(data)
		.then(res => {
			toast("OK", "You succesfuly connected. We wish you a successful work session on Poulpidou.");
			return navigate("/home");
		})
		.catch(res => toast(res.state, res.value));
	}

	return (
		<>
			<div className="flex-row-around log-in">
				<form className="flex-col-around form-side" onSubmit={handleSubmit(onSubmit)}>
					<h1>Sign in</h1>
					<label htmlFor="pseudo" className="flex-col">
						Mail
						<input type="email" id="pseudo" {...register("pseudo", {required: true})}/>
					</label>
					<label htmlFor="password" className="flex-col">
						Password
						<input type="password" id="password" {...register("password", {required: true})}/>
					</label>
					<input type="submit"/>
				</form>
				<div className="hello-side">
					<div className="grid-center">
						<div className="flex-col" style={{gap: "20px"}}>
							<h3>Welcome to Poulpidou !</h3>
							<p>The application to manage all your projects and<br/>keep regular contact with your customers!</p>
							<p>If you don't have any accounts you can have one by <u><a href="/logup">Signing up</a></u></p>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default LogIn;