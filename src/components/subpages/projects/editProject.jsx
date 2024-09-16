import React, {useState, useEffect} from 'react';
import {useForm, FormProvider} from "react-hook-form";
import {useParams, useNavigate} from 'react-router-dom';

import InputCheckbox from '../../assets/inputCheckbox';
import InputRadio from '../../assets/inputRadio';
import InputSlider from '../../assets/inputSlider';

import {putProject} from '../../../requests/projects/putProject';
import { putIsCurrent } from '../../../requests/projects/putIsCurrent';

import {useToast} from '../../../hooks/useToast';

const EditProject = ({data}) => {
	const {id} = useParams();

	const toast = useToast();

	const navigate = useNavigate();

	// const [cost, setCost] = useState(0);

	const [createdAt, setCreatedAt] = useState("");

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

	const cost = watch("project.estimatedPrice", 0);
	const sliderValue = watch("project.composition.maintenanceRange", 0);

	useEffect(() => {
		if (data == undefined || data == null) return;
		if (Object.keys(data.composition).length === 0) return;

		console.log(data)

		// Identity
		setCreatedAt(data.identity?.createdAt)
		setValue("project.identity.name", data.identity?.name);
		setValue("project.identity.startDate", data.identity?.startDateBaseFormat);
		setValue("project.identity.endDate", data.identity?.endDateBaseFormat);
		setValue("project.identity.githubLink", data.identity?.githubLink);
		setValue("project.identity.figmaLink", data.identity?.figmaLink);
		setValue("project.identity.websiteLink", data.identity?.websiteLink);
		setValue("project.notes", data.identity?.note);

		// Composition
		console.log(data.composition?.isPaying)
		setValue("project.composition.isPaying", data.composition?.isPaying ? "true" : "false");
		setValue("project.composition.database", data.composition?.database ? "true" : "false");
		setValue("project.composition.maquette", data.composition?.maquette ? "true" : "false");
		setValue("project.composition.maintenance", data.composition?.maintenance ? "true" : "false");

		setValue("project.composition.framework", data.composition?.framework);
		setValue("project.composition.type", data.composition?.type);
		setValue("project.composition.options", data.composition?.options);
		setValue("project.composition.devices", data.composition?.devices);


		// console.log("data.maintenancePercentage", data.maintenancePercentage)
		setValue("project.composition.maintenanceRange", data.maintenancePercentage);

		setValue("project.estimatedPrice", data.estimatedPrice);

		// calculateCost({project: data});
	}, [data]);

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

		setValue("project.estimatedPrice", database + typeCost + frameworkCost + optionsCost + deviceCost + maquette)

		return database + typeCost + frameworkCost + optionsCost + deviceCost + maquette;
	}

	const onSubmit = (data) => {
		putProject(data, id)
		.then(res => {
			toast(res.state, "Values were succesfuly updated.")
			navigate(`/project/${id}/specifications`)
		})
		.catch(res => toast(res.state, res.value));

		// TO DO: Errors
	}

	const toogleIsCurrent = () => {
		data.identity.isCurrent = !data.identity.isCurrent;

		putIsCurrent(data.identity.isCurrent, id)
		.then(res => {
			toast(res.state, "Project succesfuly change state.")
			navigate(`/project/${id}/specifications`)
		})
		.catch(res => toast(res.state, res.value));
	}

	// For price estimation
	const isPaying = watch("project.composition.isPaying", '');
	const maintenance = watch("project.composition.maintenance", '');

	return (

		<div className="edit-project">

			<FormProvider {...formMethods}>
				<form
					className="flex-col"
					onChange={() => calculateCost(getValues())}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex-col data-separation">
						<div className={"flex-row-between"}>

							<p><sub>Project identity data</sub></p>
							<span>Created at {createdAt}</span>
						</div>
						<div className="horizontal-line"></div>
					</div>

					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>Name*: </b></p>
						<input type="text" {...register("project.identity.name", {required: true})}/>
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
						<div className="flex-col" style={{width: '25%'}}>
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
							defaultValue={getValues("project.composition.maintenanceRange")}
							getValues={getValues}
							unit="%"
							step={1}
						/>
					</div>

					<div className="flex-end">
						<div className="flex-row-around cost-section">
							<div>
								<h4 style={{color: cost > 0 && isPaying === "true" ? "var(--blue)" : "var(--text-grey)"}}>
									{isPaying === "true" ? Math.round(cost, 0) : 0} €
								</h4>
								<p style={{marginTop: '20px'}}><sub>Total cost</sub></p>
							</div>
							<div className="vertical-line"></div>
							<div className="flex-col">
								{
									maintenance === "true" && isPaying === "true" ?
										<h4 style={{color: cost > 0 ? "var(--blue)" : "var(--text-grey)"}}>
											+{Math.round(sliderValue * cost / 100, 0)} € <span
											style={{verticalAlign: "sub", fontSize: "15px", color: "var(--text-grey)"}}>
												/ year
											</span>
										</h4>
										: <h4 style={{color: "var(--text-grey)"}}>
											+0 € <span
											style={{verticalAlign: "sub", fontSize: "15px", color: "var(--text-grey)"}}>
											/ year
										</span>
										</h4>
								}
								<p style={{marginTop: '20px'}}><sub>Maintenance</sub></p>
							</div>
						</div>
					</div>

					<div className="flex-col data-separation">
						<p><sub>Notes</sub></p>
						<div className="horizontal-line"></div>
					</div>

					<textarea {...register("project.notes")}></textarea>

					<div className="flex-row-between">
						<div>
							<input type="submit" value="Update the project"/>
						</div>
						<div>
							{
								data.identity.isCurrent 
								? <input type="submit" value="Set project as ended" onClick={(e) => {
									e.preventDefault();
									toogleIsCurrent();
								}}/>
								: <input type="submit" value="Set project as current" onClick={(e) => {
									e.preventDefault();
									toogleIsCurrent();
								}}/>
							}
							
						</div>
					</div>

				</form>
			</FormProvider>
		</div>
	);
}

export default EditProject;