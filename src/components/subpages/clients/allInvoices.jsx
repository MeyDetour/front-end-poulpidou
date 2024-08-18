import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllInvoices = () => {
	const [invoices, setInvoices] = useState([{
		id: 0,
		projectName: "F&B-Database",
		date: "17/08/2024",
		reason: "Laboris sit consectetur irure aute eiusmod dolor dolor magna magna non dolor consectetur consectetur minim sunt ut."
	}]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col" style={{gap: "10px"}}>
					{
						invoices.length !== 0 ?
						invoices.map((invoice) => {
							return (
								<Link>
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