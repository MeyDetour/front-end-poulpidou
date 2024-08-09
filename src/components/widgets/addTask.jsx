import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddTask = ({ values }) => {
	const [isNew, _] = useState(Object.keys(values).length === 0);

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

		if (isNew) {
			// Post request + return
		}
		// Put request 
	}

	const deleteTask = () => {
		// values.id
	}

	setValue("title", values.title);
	setValue("category", values.category);
	setValue("content", values.content);
	setValue("dueDate", values.dueDate);

	return (
		<div id="addTask" className="widget" onClick={(e) => e.stopPropagation()}>
			<form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex-row-between">
					{
						isNew 
						? <h2>Add a new task to the current project:</h2>
						: (
							<>
								<h2>Modify task values</h2>
								<img src="pictures/icons/trash.svg" alt="trash" title="Delete task" onClick={() => deleteTask()}/>
							</>
						)
					}
				</div>

				<div className="flex-row">
					<p className="text-of-input" title="This field is required"><b>Title*: </b></p>
					<input type="text" {...register("title", {required: true})}/>
				</div>
				<div className="flex-row">
					<p className="text-of-input" title="This field is required"><b>Category*: </b></p>
					<input list="categories" type="text" {...register("category", {required: true})}/>
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
					<input type="date" {...register("dueDate", {valueAsDate: true})} />
				</div>
				<div>
					<input type="submit" value={isNew ? "Add task" : "Modify task"} />
				</div>
			</form>
		</div>
	);
}

export default AddTask;