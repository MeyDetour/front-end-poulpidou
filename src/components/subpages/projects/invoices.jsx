import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { getInvoices } from '../../../requests/projects/getInvoices';

import InputCheckbox from '../../assets/inputCheckbox';

import { useToast } from '../../../hooks/useToast';

const Invoices = () => {
	const { id } = useParams();

	const toast = useToast();

	const [invoices, setInvoices] = useState([
		{	"id":1,
			"projectName": "OSIMI Project",
			"client":{
			"firstName": "Henri",
				"lastName": "BERTRAND",
			},
			"price":25,
			"date": "28/08/2024",
			"nbActions": 3,
			"isPaid":false
		} ,{
			"id": 2,
			"projectName": "BrightFuture Campaign",
			"client": {
				"firstName": "Lena",
				"lastName": "MARTIN"
			},
			"price": 150,
			"date": "02/09/2024",
			"nbActions": 5,
			"isPaid": false
		}
,{
			"id": 3,
			"projectName": "InnovateX Website",
			"client": {
				"firstName": "Raj",
				"lastName": "PATEL"
			},
			"price": 500,
			"date": "15/09/2024",
			"nbActions": 8,
			"isPaid": true
		}
,{
			"id": 4,
			"projectName": "EcoGreen Branding",
			"client": {
				"firstName": "Sophia",
				"lastName": "JOHNSON"
			},
			"price": 75,
			"date": "25/09/2024",
			"nbActions": 4,
			"isPaid": false
		}
,{
			"id": 5,
			"projectName": "TechGuru App",
			"client": {
				"firstName": "Carlos",
				"lastName": "RODRIGUEZ"
			},
			"price": 300,
			"date": "10/10/2024",
			"nbActions": 6,
			"isPaid": true
		}
,{
			"id": 6,
			"projectName": "UrbanStyle Design",
			"client": {
				"firstName": "Emily",
				"lastName": "SMITH"
			},
			"price": 120,
			"date": "18/10/2024",
			"nbActions": 7,
			"isPaid": false
		}






	]);
	/*useEffect(() => {
		getInvoices(id)
		.then(res => setInvoices(res.value))
		.catch(res => toast(res.state, res.value))
	}, []);*/

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

			<div className=" redButton" style={{width:'100%', marginBottom:"20px"}}  >
				This is just an example to show you what the invoice list will look like. Please note that the
				functionality is still in development and not yet available. <a href="/pdf/example.pdf" style={{
				textDecoration: 'underline',
				color: '#de4918'
			}} download="example.pdf">
				Click here</a> to download a sample invoice.
			</div>
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
								<th scope="col">Actions</th>
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
												<span>#{invoice.id}</span>
											</th>
											<td><span>{invoice.date}</span></td>
											<td><span>{invoice.client.firstName} {invoice.client.lastName}</span></td>
											<td><span>{invoice.price} €</span></td>
											<td><span>{invoice.nbActions} action(s)</span></td>
											<td></td>
											<td className="alignEnd"><span
												className={invoice.isPaid ? 'payed' : 'unpayed'}>{invoice.isPaid ? 'Payed' : 'Unpayed'}</span>
											</td>
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