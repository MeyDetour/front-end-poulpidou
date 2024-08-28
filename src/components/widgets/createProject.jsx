import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";

import { Link } from 'react-router-dom';

import InputCheckbox from '../assets/inputCheckbox';
import InputRadio from '../assets/inputRadio';
import InputSlider from '../assets/inputSlider';

const CreateProject = (props) => {
	const [cost, setCost] = useState(0);

	const [clients, setClients] = useState([{
		name: "Gaëlle GHIZOLI",
		mail: "gaëlle.ghizoli@outlook.com",
		id: 0
	}, {
		name: "Maxence ABRILE",
		mail: "maxenceabrile@icloud.com",
		id: 1
	}]);

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

	const calculateCost = (data) => {
		// if (!data.isPaying) return 0;
		data = data.project;

		let maquette = 0;
		if (data.composition.maquette === "true") maquette = 800;

		let database = 0;
		if (data.composition.database === "true") database = 1000; // nullable if Symfony/Django

		let typeCost = 0;
		if (data.composition.type !== false) {
			if (data.composition.type.indexOf('showcase') !== -1) typeCost += 1000;
			if (data.composition.type.indexOf('eCommerce') !== -1) typeCost += 3500;
			if (data.composition.type.indexOf('software') !== -1) typeCost += 4500;
			if (data.composition.type.indexOf('app') !== -1) typeCost += 5000;
			if (data.composition.type.indexOf('forum') !== -1) typeCost += 1500;
			if (data.composition.type.indexOf('blog') !== -1) typeCost += 1000;
			if (data.composition.type.indexOf('videoGame') !== -1) typeCost += 5000;
			if (data.composition.type.indexOf('api') !== -1) typeCost += 750;
		}

		let frameworkCost = 0;
		if (data.composition.framework !== false) {
			if (data.composition.framework.indexOf('symfony') !== -1) {
				frameworkCost += 1500;
				database = 250;
			}
			if (data.composition.framework.indexOf('django') !== -1) {
				frameworkCost += 1000;
				database = 250;
			}
			if (data.composition.framework.indexOf('node') !== -1) {
				frameworkCost += 1200;
				database = 250;
			}
			if (data.composition.framework.indexOf('react') !== -1) frameworkCost += 1500;
			if (data.composition.framework.indexOf('vue') !== -1) frameworkCost += 1200;
			if (data.composition.framework.indexOf('angular') !== -1) frameworkCost += 1200;
		}

		let optionsCost = 0;
		if (data.composition.options !== false) {
			if (data.composition.options.indexOf('mailServer') !== -1) optionsCost += 500;
			if (data.composition.options.indexOf('phoneServer') !== -1) optionsCost += 500;
			if (data.composition.options.indexOf('payingMethods') !== -1) optionsCost += 1000;
			if (data.composition.options.indexOf('account') !== -1) optionsCost += 100;
			if (data.composition.options.indexOf('images') !== -1) optionsCost += 200;
		}

		let deviceCost = 0;
		if (data.composition.devices !== false) {
			if (data.composition.devices.indexOf('mobile') !== -1) deviceCost += 200;
			if (data.composition.devices.indexOf('computer') !== -1) deviceCost += 100;
			if (data.composition.devices.indexOf('television') !== -1) deviceCost += 400;
			if (data.composition.devices.indexOf('printer') !== -1) deviceCost += 400;
		}

		// return database + typeCost + frameworkCost + optionsCost + deviceCost + maquette;
		setCost(database + typeCost + frameworkCost + optionsCost + deviceCost + maquette);
	}

	const onSubmit = (data) => {
		console.log(data)
		data.project.identity["client_id"] = null; 
		clients.forEach(object => {
			if (object.name + " - " + object.mail === data.project.identity.clientName) data.project.identity["client_id"] = object.id;
		})
		if (data.project.identity["client_id"] === null) return alert("Error !");

		console.log(errors)
	}

	// For price estimation
	const sliderValue = watch("project.composition.maintenanceRange", 33);
	const isPaying = watch("project.composition.isPaying", '');
	const maintenance = watch("project.composition.maintenance", '');

	return (
		<div id="createProject" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
			<h2>New project</h2>
			<FormProvider {...formMethods}>
				<form className="flex-col scroll-container" onChange={() => calculateCost(getValues())} onSubmit={handleSubmit(onSubmit)}>
					<div className="flex-col data-separation">
						<p><sub>Project identity data</sub></p>
						<div className="horizontal-line"></div>
					</div>

					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>Name*: </b></p>
						<input type="text" {...register("project.identity.name", {required: true})}/>
					</div>
					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>Client*: </b></p>
						<input list="clients" type="text" {...register("project.identity.clientName", {required: true})}/>
						<datalist id="clients">
						{
							clients.length > 0 ? 
							clients.map((client) => {
								return <option value={client.name + " - " + client.mail} key={client.mail}/>
							}) : null
						}
						</datalist>

						<button>Add a client</button>
					</div>
					<div className="flex-row-between date-section">
						<div className="flex-row">
							<p className="text-of-input"><b>Start date: </b></p>
							<input type="date" {...register("project.identity.startDate")}/>
						</div>
						<img src="pictures/icons/arrow.svg" alt="arrow"/>
						<div className="flex-row">
							<p className="text-of-input"><b>End date: </b></p>
							<input type="date" {...register("project.identity.endDate")}/>
						</div>
					</div>
					<div className="flex-row">
						<p className="text-of-input" style={{minWidth: "fit-content"}}><b>Github link: </b></p>
						<input type="text" {...register("project.identity.githubLink")}/>
					</div>
					<div className="flex-row">
						<p className="text-of-input" style={{minWidth: "fit-content"}}><b>Figma link: </b></p>
						<input type="text" {...register("project.identity.figmaLink")}/>
					</div>
					<div className="flex-row">
						<p className="text-of-input" style={{minWidth: "fit-content"}}><b>Website link: </b></p>
						<input type="text" {...register("project.identity.websiteLink")}/>
					</div>

					<div className="flex-col data-separation">
						<p><sub>Project compostion data</sub></p>
						<div className="horizontal-line"></div>
					</div>

					<div className="flex-row-between" style={{width: '100%'}}>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Is a paying project</b></p>
							{
								[true, false].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputRadio
												id={"project.composition.isPaying." + value}
												name="project.composition.isPaying"
												value={value}
												options={{required: true}}
											/>
											<label htmlFor={"project.composition.isPaying." + value}>
												{value ? "Yes" : "No"}
											</label>
										</div>
									);
								})
							}
						</div>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Needs database</b></p>
							{
								[true, false].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputRadio
												id={"project.composition.database." + value}
												name="project.composition.database"
												value={value}
												options={{required: true}}
											/>
											<label htmlFor={"project.composition.database." + value}>
												{value ? "Yes" : "No"}
											</label>
										</div>
									);
								})
							}
						</div>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Needs maquette</b></p>
							{
								[true, false].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputRadio
												id={"project.composition.maquette." + value}
												name="project.composition.maquette"
												value={value}
												options={{required: true}}
											/>
											<label htmlFor={"project.composition.maquette." + value}>
												{value ? "Yes" : "No"}
											</label>
										</div>
									);
								})
							}
						</div>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Needs maintenance</b></p>
							{
								[true, false].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputRadio
												id={"project.composition.maintenance." + value}
												name="project.composition.maintenance"
												value={value}
												options={{required: true}}
											/>
											<label htmlFor={"project.composition.maintenance." + value}>
												{value ? "Yes" : "No"}
											</label>
										</div>
									);
								})
							}
						</div>
					</div>
					<div className="flex-row-between" style={{width: '100%', marginTop: "30px"}}>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Type</b></p>
							{
								// TO DO : MODIFY BACKEND TO ACCEPT NEW OPTIONS
								['showcase', 'eCommerce', 'software', 'app', 'forum', 'blog', 'videoGame', 'api'].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputCheckbox
												id={"project.composition.type." + value}
												name="project.composition.type"
												value={value}
												options={null}
											/>
											<label htmlFor={"project.composition.type." + value}>
												{
													value === "eCommerce" 
													? "E-Commerce"
													: value === "videoGame" 
													? "Video game"
													: value.charAt(0).toUpperCase() + value.slice(1)
												}
											</label>
										</div>
									);
								})
							}
						</div>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Framework</b></p>
							{
								['symfony', 'django', 'react', 'vue', 'angular', 'node'].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputCheckbox
												id={"project.composition.framework." + value}
												name="project.composition.framework"
												value={value}
												options={null}
											/>
											<label htmlFor={"project.composition.framework." + value}>
												{
													value === "react" 
													? "ReactJS"
													: value === "vue" 
													? "VueJS"
													: value === "angular"
													? "AngularJS"
													: value === "node"
													? "NodeJS"
													: value.charAt(0).toUpperCase() + value.slice(1)
												}
											</label>
										</div>
									);
								})
							}
						</div>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Options</b></p>
							{
								['mailServer', 'phoneServer', 'payingMethods', 'account', 'images'].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputCheckbox
												id={"project.composition.options." + value}
												name="project.composition.options"
												value={value}
												options={null}
											/>
											<label htmlFor={"project.composition.options." + value}>
												{
													value === "mailServer" 
													? "Mail server"
													: value === "phoneServer" 
													? "Phone server"
													: value === "payingMethods"
													? "Paying methods"
													: value.charAt(0).toUpperCase() + value.slice(1)
												}
											</label>
										</div>
									);
								})
							}
						</div>
						<div className="flex-col" style={{width: "25%"}}>
							<p className="compostion-data-title"><b>Devices/Platforms</b></p>
							{
								['mobile', 'computer', 'television', 'printer'].map((value) => {
									return (
										<div className="flex-row input-container">
											<InputCheckbox
												id={"project.composition.devices." + value}
												name="project.composition.devices"
												value={value}
												options={null}
											/>
											<label htmlFor={"project.composition.devices." + value}>
												{value.charAt(0).toUpperCase() + value.slice(1)}
											</label>
										</div>
									);
								})
							}
						</div>
					</div>
					<div className="flex-col">
						<p><b>Maintenance:</b></p>
						<InputSlider 
							register={register}
							name="project.composition.maintenanceRange"
							min={1}
							max={100}
							defaultValue={33}
							getValues={getValues}
							unit="%"
							step={1}
						/>
					</div>

					<div className="flex-end">
						<div className="flex-row-around cost-section">
							<div>
								<h4 style={{color: cost > 0 && isPaying === "true" ? "var(--blue)" : "var(--text-grey)"}}>
									{isPaying === "true" ? cost : 0} €
								</h4>
								<p style={{marginTop: '-8px'}}><sub>Total cost</sub></p>	
							</div>
							<div className="vertical-line"></div>
							<div className="flex-col">
								{ 
									maintenance === "true" && isPaying === "true" ?
										<h4 style={{color: cost > 0 ? "var(--blue)" : "var(--text-grey)"}}>
											+{Math.round(sliderValue * cost/100, 0)} € <span style={{verticalAlign: "sub", fontSize: "15px", color: "var(--text-grey)"}}>
												/ year
											</span>
										</h4>
									: <h4 style={{color: "var(--text-grey)"}}>
										+0 € <span style={{verticalAlign: "sub", fontSize: "15px", color: "var(--text-grey)"}}>
											/ year
										</span>
									</h4>
								}
								<p><sub>Maintenance</sub></p>					
							</div>
						</div>
					</div>

					<div className="flex-col data-separation">
						<p><sub>Notes</sub></p>
						<div className="horizontal-line"></div>
					</div>

					<textarea name="" id=""></textarea>

					<div>
						<input type="submit" value="Create the project"/>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

export default CreateProject;
