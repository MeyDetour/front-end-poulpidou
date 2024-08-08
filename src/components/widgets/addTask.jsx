import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddTask = () => {
	const [categories, setCategories] = useState([{
		id: 0,
		name: "dev",
	}, {
		id: 1,
		name: "design",
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
		data["category_id"] = null;

		categories.forEach(category => {
			if (data.category === category.name) data["category_id"] = category.name;
		});
	}

	return (
		<div id="addTask" className="widget" onClick={(e) => e.stopPropagation()}>
			<form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
				<h2>Add a new task to the current project:</h2>

				<div className="flex-row">
					<p className="text-of-input" title="This field is required"><b>Name*: </b></p>
					<input type="text" {...register("name", {required: true})}/>
				</div>
				<div className="flex-row">
					<p className="text-of-input" title="This field is required"><b>Category*: </b></p>
					<input list="categories" type="text" {...register("Category", {required: true})}/>
					<datalist id="categories">
					{
						categories.length > 0 ? 
						categories.map((category) => {
							return <option value={category.name} key={category.id}/>
						}) : null
					}
					</datalist>
				</div>
				<div className="flex-row">
					<p className="text-of-input"><b>Content: </b></p>
					<textarea {...register("content")}></textarea>
				</div>
				<div className="flex-row">
					<p className="text-of-input"><b>Due date: </b></p>
					<input type="date" {...register("dueDate")} />
				</div>
				<div>
					<input type="submit" value="Add task"/>
				</div>
			</form>
		</div>
	);
}

export default AddTask;