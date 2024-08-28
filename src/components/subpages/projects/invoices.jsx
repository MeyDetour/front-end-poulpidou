import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { getInvoices } from '../../../requests/projects/getInvoices';

import InputCheckbox from '../../assets/inputCheckbox';

import { useToast } from '../../../hooks/useToast';

const Invoices = () => {
	const { id } = useParams();

	const toast = useToast();

	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		getInvoices(id)
		.then(res => setInvoices(res.value))
		.catch(res => toast(res.state, res.value))
	}, []);

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
					<div className="invoiceListContainer">
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