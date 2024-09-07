import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useToast } from '../hooks/useToast';

import { logUp } from '../requests/users/logUp';

const LogUp = () => {
	const toast = useToast();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = (data) => {
		console.log("LOG UP")
		if (data.password !== data.password2) return toast("warning", "The password and the password verification must be the same.");

		logUp(data)
		.then(res => {
			toast("OK", "You succesfuly connected. We wish you a successful work session on Poulpidou.");
			return navigate("/home");
		})
		.catch(res => toast(res.state, res.value));
	}

	const onError = (error) => {
		console.log(error)
		if (error.pseudo?.type === 'required') return toast("warning", "The email field is required.");
		if (error.pseudo?.type === 'minLength') return toast("warning", "Your email must at least be of 5 characters long.");
		if (error.pseudo?.type === 'maxLength') return toast("warning", "Your email must be less then 50 characters long.");

		if (error.password?.type === 'required') return toast("warning", "The password field is required.");
		if (error.password?.type === 'minLength') return toast("warning", "Your password must at least be of 8 characters long.");
		if (error.password?.type === 'maxLength') return toast("warning", "Your password must be less then 30 characters long.");

		if (error.password2?.type === 'required') return toast("warning", "The password verification field is required.");
	}

	return (
		<>
			<div className="flex-row-around log-in">
				<div className="hello-side">
					<div className="grid-center">
						<div className="flex-col" style={{gap: "20px"}}>
							<h3>Welcome to Poulpidou !</h3>
							<p>The application to manage all your projects and<br/>keep regular contact with your customers!</p>
							<p>If you already have an account you can <u><a href="/login">Sign in</a></u></p>
						</div>
					</div>
				</div>
				<form className="flex-col-around form-side" onSubmit={handleSubmit(onSubmit, onError)}>
					<h1>Sign up</h1>
					<label htmlFor="pseudo" className="flex-col">
						Mail
						<input type="email" id="pseudo" {...register("pseudo", {
							required: true,
							maxLength: 50,
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Entered value does not match email format",
							}})}
						/>
					</label>
					<label htmlFor="password" className="flex-col">
						Password
						<input type="password" id="password" {...register("password", {required: true, minLength: 8, maxLength: 30})}/>
					</label>
					<label htmlFor="password" className="flex-col">
						Password verification
						<input type="password" id="password" {...register("password2", {required: true})}/>
					</label>
					<input type="submit"/>
				</form>
			</div>
			<ToastContainer />
		</>
	);
}

export default LogUp;