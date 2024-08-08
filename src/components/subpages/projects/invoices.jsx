import React, { useState, useRef } from 'react';
import { useForm, FormProvider } from "react-hook-form";

import InputCheckbox from '../../assets/inputCheckbox';

const Invoices = () => {
	const [invoices, setInvoices] = useState([{
		id: 0,
		title: 3,
		date: "03/08/2024",
		price: 11000,
		isPaid: false,
		client: {
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}, {
		id: 1,
		title: 1,
		date: "03/08/2024",
		price: 120,
		isPaid: true,
		client: {
			firstName: "Maxence",
			lastName: "ABRILE",
		}
	}]);

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

	const onSubmit = (data) => {

	};

	return (
		<>	
			<div className="flex-row">
				<img src="pictures/icons/invoice-icon.svg" alt="invoice"/>
				<h3>Invoices list</h3>
			</div>

			<div className="horizontal-line"></div>

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="table">
						<div className="flex-row-around table__header">
							<div className="table__cell"></div>
							<div>ID</div>
							<div>Date</div>
							<div>Client name</div>
							<div>Total cost</div>
							<div>Titles</div>
							<div>Status</div>
						</div>
						<div className="flex-row-around table__content">
							
						</div>
					</div>
				</form>
			</FormProvider>
		</>
	);
}

export default Invoices;