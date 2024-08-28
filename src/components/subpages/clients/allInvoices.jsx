import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useToast } from '../../../hooks/useToast';

import { getClientInvoices } from '../../../requests/clients/getClientInvoices';

import { useParams } from 'react-router-dom';

const AllInvoices = () => {
	const { id } = useParams();

	const toast = useToast();

	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		if (id == undefined) return;

		getClientInvoices(id)
		.then(res => setInvoices(res.value))
		.catch(res => toast(res.state, res.value));
	}, [id]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col" style={{gap: "10px"}}>
					{
						invoices.length !== 0 ?
						invoices.map((invoice) => {
							return (
								<Link to={``}>
									<div className="flex-col invoice" style={{gap: "5px"}}>
										<div className="flex-row-between">
											<div className="flex-row" style={{gap: "10px"}}>
												<p className="invoice__id">#{invoice.id}</p>
												<p className="invoice__project-name">{invoice.projectName}</p>
											</div>
											<p className="invoice__date">{invoice.date}</p>
										</div>
										<p className="invoice__reason">{invoice.reason}</p>
									</div>
								</Link>
							)
						}) : null
					}
				</div>
			</div>
		</>
	);
}

export default AllInvoices;