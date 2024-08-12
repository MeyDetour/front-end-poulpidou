import { useForm, FormProvider } from "react-hook-form";

const EditProfile = () => {
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

	const onSubmit = () => {

	}

	return (
		<>	
			<div className="scroll-container" style={{height: "100%"}}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex-col" style={{height: "100%", gap: "30px"}}>
					<h2>Edit client profile</h2>

					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>First name*: </b></p>
						<input type="text" {...register("lastName", {required: true})}/>
					</div>
					<div className="flex-row">
						<p className="text-of-input" title="This field is required"><b>Last name*: </b></p>
						<input type="text" {...register("firstName", {required: true})}/>
					</div>
					<div className="flex-row-between">
						<div className="flex-row">
							<p className="text-of-input" title="This field is required"><b>Email*: </b></p>
							<input type="text" {...register("email", {required: true})}/>
						</div>
						<div className="flex-row">
							<p className="text-of-input" title="This field is required"><b>Phone*: </b></p>
							<input type="text" {...register("phone", {required: true})}/>
						</div>
					</div>
					<div className="flex-row-between">
						<div className="flex-row">
							<p className="text-of-input" title="This field is required"><b>Job*: </b></p>
							<input type="text" {...register("job", {required: true})}/>
						</div>
						<div className="flex-row">
							<p className="text-of-input" title="This field is required"><b>Location: </b></p>
							<input type="text" {...register("location", {required: true})}/>
						</div>
					</div>
					<div className="flex-col" style={{height: "100%"}}>
						<p className="text-of-input"><b>Notes: </b></p>
						<textarea name="" id="" style={{height: "100%"}}></textarea>
					</div>
					<div className="flex-row" style={{marginBottom: "20px", gap: "10px"}}>
						<input type="submit" value="Save changes"/>
						<input type="submit" value="Abort changes"/>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditProfile;