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
					<div class="invoiceListContainer">
						<table>

							<thead>
							<tr>
								<th scope="col">Invoice #</th>
								<th scope="col">Date</th>
								<th scope="col">Client Name</th>
								<th scope="col">Total Price</th>
								<th scope="col">Titles</th>
								<th scope="col"></th>
								<th scope="col">Pay</th>
							</tr>
							</thead>
							<tbody>
							{
								invoices.length > 0 &&
								invoices.map((invoice) => {
									return (
										<tr>
											<th scope="row" className="alignCenter">
												<input type="checkbox"/>
										  		<span>#{ invoice.id }</span>  
										  	</th>
											<td><span>{ invoice.date }</span></td>
											<td><span>{ invoice.client.firstName } { invoice.client.lastName }</span></td>
											<td><span>{ invoice.price } €</span></td>
											<td><span>{ invoice.nbTitles } titles</span></td>
											<td></td>
											<td className="alignEnd"> <span className={ invoice.isPaid ? 'payed' : 'unpayed'}>{ invoice.isPaid ? 'Payed' : 'Unpayed' }</span></td>
										</tr>
									);
								})
							}
							</tbody>

						</table>
					</div>
				</form>
			</FormProvider>
		</>
	);
}

export default Invoices;