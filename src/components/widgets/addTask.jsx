import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { postTask } from '../../requests/projects/postTask';
import { putTask } from '../../requests/projects/putTask';
import { delTask } from '../../requests/projects/delTask';

import { useToast } from '../../hooks/useToast';
import Logs from "../subpages/settings/logs";

const AddTask = ({ values, setDisplayWidget }) => {
	const { id } = useParams();
	const toast = useToast();

	const [isNew, setIsNew] = useState(Object.keys(values).length === 0);

	const [categories, setCategories] = useState([]);

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

	useEffect(() => {
		setValue("title", values.title);
		setValue("category", values.category);
		setValue("content", values.content);
		setValue("dueDate", values.dueDate);
		values.list != undefined && setValue("status", values.list);
	}, []);

	const onSubmit = (data) => {
		data["id"] = values.id;
		if (isNew) {
			return postTask(data,id)
			.then(res => {
				toast("OK", "The operation was successful.");
				setDisplayWidget(false);
			})
			.catch(res => toast(res.state, res.value));
		}
		console.log("MODIFY")
		putTask(data, id)
		.then(res => {
			toast("OK", "The operation was successful.");
			setDisplayWidget(false);
		})
		.catch(res => toast(res.state, res.value));
	}

	const onError = (error) => {
		console.log(error)
		if (error.title) return toast("warning", "The title field is required.");
	}

	const deleteTask = () => {
		setValue("id", values.id);

		delTask(getValues(), id)
		.then(res => {
			toast("OK", "The operation was successful.");
			setDisplayWidget(false);
		})
		.catch(res => toast(res.state, res.value));
	}

	const input = useRef(null);

	useEffect(() => {
		if (!input.current) return;

		input.current.focus();
	}, [input]);

	return (
		<div id="addTask" className="widget" onClick={(e) => e.stopPropagation()}>
			<form className="flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
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
					<input 
						type="text"
						{...register("title", {required: true})}
						autoFocus
					/>
				</div>
				<div className="flex-row">
					<p className="text-of-input" title="This field is required"><b>Category: </b></p>
					<input list="categories" type="text" {...register("category")}/>
					<datalist id="categories">
					{
						categories.length > 0 &&
						categories.map((category) => {
							return <option value={category.name} key={category.id}/>
						})
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
				<div className="flex-col">
					<p className="text-of-input"><b>State: </b></p>
					<select {...register("status")} defaultValue="waiting">
						<option value="waiting">Waiting</option>
						<option value="progress">In progress</option>
						<option value="done">Done</option>
					</select>
				</div>
				<div>
					<input type="submit" value={isNew ? "Add task" : "Modify task"}/>
				</div>
			</form>
		</div>
	);
}

export default AddTask;