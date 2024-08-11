import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";

import InputRadio from '../../assets/inputRadio';
import InputCheckbox from '../../assets/inputCheckbox';

const Configuration = () => {
	const [values, setValues] = useState(null);

	const formMethods = useForm();
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
	} = formMethods;

	const onSubmit = (data) => {
		
	}

	return (
		<div className="flex-row-between container">
			<div className="conditions-of-payement">
				<div className="conditions-of-payement__header">
					<h3>Terms and Conditions</h3>
				</div>
				<div className="scroll-container">
					<div className="conditions-of-payement__content">
						<section>
							<span>Late Payment Consequences</span>
							<p>In the event of a late payment, project delivery may be delayed, potentially extending beyond the originally agreed deadline.</p>
						</section>
						<section>
							<span>Dispute Resolution</span>
							<p>In case of disagreement, parties will attempt to resolve the issue amicably through discussion and negotiation. If unresolved, parties may choose to engage a neutral mediator or arbitrator to assist in resolving the dispute.</p>
						</section>
						<section>
							<span>Project Cancellation</span>
							<ul>
								<li><u>Full Refund:</u> If the project is canceled before work begins, a full refund may be issued.</li>
								<li><u>Partial Refund:</u> If the project is canceled after work has started, a partial refund reflecting the work completed may be considered.</li>
								<li><u>No Refund:</u> No refund may be provided if a significant portion of the project has been completed.</li>
							</ul>
						</section>
						<section>
							<span>Non-Payment</span>
							<p>In case of non-payment, no penalty fees will be charged, but services will be suspended until payment is received.</p>
						</section>
						<section>
							<span>Confidentiality Agreements</span>
							<p>Both parties agree to maintain confidentiality of all proprietary and sensitive information disclosed during the project. This agreement remains in effect even after the project is completed.</p>
						</section>
						<section>
							<span>Contract Termination Conditions</span>
							<p><u>Breach of Contract:</u> The contract may be terminated if either party fails to meet its obligations, including:</p>
							<ul>
								<li>Non-payment by the client.</li>
								<li>Failure to deliver services by the provider as agreed upon.</li>
								<li>Breach of confidentiality agreements.</li>
							</ul>
							<p><u>Mutual Agreement:</u> The contract can be terminated at any time if both parties agree.</p>
						</section>
						<section>
							<span>Payment Milestones</span>
							<ul>
								<li><u>Initial Deposit:</u> A percentage of the total cost paid upfront to initiate the project.</li>
								<li><u>Progress Payments:</u> Payments made at specific stages of project completion (e.g., 25%, 50%, and 75% completion).</li>
								<li><u>Final Payment:</u> The remaining balance is due upon project completion and client approval.</li>
							</ul>
						</section>
					</div>
				</div>
			</div>
			<div style={{width: "48%"}}>
				<FormProvider {...formMethods}>
					<form className="flex-col-between" style={{height: "100%"}} onSubmit={handleSubmit(onSubmit)}>
						<div className="flex-col">
							<div className="conditions-of-payement-form">
								<div className="conditions-of-payement-form__header">
									<h3>Terms and Conditions</h3>
								</div>
								<div className="scroll-container">
									<div className="conditions-of-payement__content">
										<section>
											<span>Accepted Payment Delays</span>
											<div className="flex-col">
											{
												[30, 50, 60].map((val) => {
													return (
														<div className="flex-row" key={val}>
															<InputRadio id={"net-" + val} name="delayDays" value={val} />
															<label htmlFor={"net-" + val}>Net {val}: Payment due {val} days after the invoice date.</label>
														</div>
													);
												})
											}
											</div>
										</section>
										<section>
											<span>Accepted payment delays</span>
											<div className="flex-row">
												<InputCheckbox id="installmentPayments" name="installmentPayments" />
												<label htmlFor="installmentPayments">Users can opt for installment payments if they prefer not to pay in a single transaction.</label>
											</div>
										</section>
										<section>
											<span>Free maintenance for first year</span>
											<div className="flex-row">
												<InputCheckbox id="freeMaintenance" name="freeMaintenance" />
												<label htmlFor="freeMaintenance">Free maintenance is included for the first year starting from the project initiation date.</label>
											</div>
										</section>
										<section>
											<span>Accepted Payment Delays</span>
											<div className="flex-col">
											{
												["CHEQUE", "CASH", "BANKTRANSFER"].map((val) => {
													return (
														<div className="flex-row" key={val}>
															<InputCheckbox id={"payments-" + val} name="payments" value={val} />
															<label htmlFor={"payments-" + val}>
																{
																	val === "CHEQUE"
																	? "Cheque"
																	: val === "CASH"
																	? "Cash"
																	: "Bank transfer"
																}
															</label>
														</div>
													);
												})
											}
											</div>
										</section>
									</div>
								</div>
							</div>
							<div className="flex-row-around" style={{marginTop: "20px"}}>
								<section className="flex-col" style={{gap: "5px"}}>
									<span>Date format</span>
									{
										["UE", "SUI", "PB", "US", "AS", "ISO"].map((val) => {
											return (
												<div className="flex-row" key={val}>
													<InputRadio id={"date-" + val} name="formatDate" value={val} />
													<label htmlFor={"date-" + val}>
														{
															val === "UE"
															? "dd/mm/yyyy"
															: val === "SUI"
															? "dd.mm.yyyy"
															: val === "PB"
															? "dd-mm-yyyy"
															: val === "US"
															? "mm/dd/yyyy"
															: val === "AS"
															? "yyyy/mm/dd"
															: "yyyy-mm-dd"
														}
													</label>
												</div>
											);
										})
									}
								</section>
							</div>
						</div>
						<div className="flex-end">
							<input type="submit" value="Save configurations"/>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}

export default Configuration;
