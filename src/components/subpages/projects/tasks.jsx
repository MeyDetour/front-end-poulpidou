import React, { useState, useEffect, useRef } from 'react';
import { Reorder } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { getTasks } from '../../../requests/projects/getTasks';
import { putOrderTaks } from '../../../requests/projects/putOrderTaks';

import Task from './task';
import AddTask from '../../widgets/addTask';

import { useToast } from '../../../hooks/useToast';

const Tasks = ({ displayWidget, setDisplayWidget }) => {
	const { id } = useParams();

	const toast = useToast();

	const [values, setValues] = useState({});

	const [isDragging, setIsDragging] = useState(false);

	const [tasksWaiting, setTasksWaiting] = useState([]);
	const [tasksProgress, setTasksProgress] = useState([]);
	const [tasksDone, setTasksDone] = useState([]);

	const modifiedList = useRef(null);

	const [draggedTask, setDraggedTask] = useState(null);

	useEffect(() => {
		getTasks(id)
		.then(res => {
			setTasksWaiting(res.value.waiting != undefined ? res.value.waiting : []);
			setTasksProgress(res.value.progress != undefined ? res.value.progress : []);
			setTasksDone(res.value.done != undefined ? res.value.done : []);
		})
		.catch(res => toast(res.state, res.value));
	}, [displayWidget]);

	useEffect(() => {
		if (isDragging) return;
		if (!draggedTask) return;

		if (modifiedList.current === "waiting") {
			putOrderTaks(draggedTask, tasksWaiting.map(elm => elm.id).indexOf(draggedTask))
			.catch(res => toast(res.state, res.value));
		}

		if (modifiedList.current === "progress") {
			putOrderTaks(draggedTask, tasksProgress.map(elm => elm.id).indexOf(draggedTask))
			.catch(res => toast(res.state, res.value));
		}

		if (modifiedList.current === "done") {
			putOrderTaks(draggedTask, tasksDone.map(elm => elm.id).indexOf(draggedTask))
			.catch(res => toast(res.state, res.value));
		}
		
		setDraggedTask(null);
	}, [isDragging]);

	const waiting_ref = useRef(null);
	const progress_ref = useRef(null);
	const done_ref = useRef(null);

	useEffect(() => {
		if (!displayWidget) {
			setValues({});
		}
	}, [displayWidget]);

	return (
		<>
			<div className="flex-row-between tasks">
				<div className="flex-col tasks__waiting">
					<div>
						<h3>Waiting</h3>
						<div className="horizontal-line"></div>
					</div>
					<Reorder.Group
						axis="y" 
						onReorder={(e) => {
							setTasksWaiting(e);
							modifiedList.current = "waiting"
						}}
						values={tasksWaiting} 
						ref={waiting_ref}
						style={{height: "100%", overflowY: "auto"}} 
						layoutScroll
					>
						{
							tasksWaiting.length !== 0 &&
							tasksWaiting.map((task, index) => (
								<Task 
									key={task.id}
									item={task}
									container={waiting_ref}
									setValues={setValues}
									setDisplayWidget={setDisplayWidget}
									list={"waiting"}
									setDraggedTask={setDraggedTask}
									isDragging={isDragging}
									setIsDragging={setIsDragging}
								/>
							))
						}
					</Reorder.Group>
				</div>
				<div className="flex-col tasks__in-progress">
					<div>
						<h3>In progress</h3>
						<div className="horizontal-line"></div>
					</div>
					<Reorder.Group
						axis="y" 
						onReorder={(e) => {
							setTasksProgress(e);
							modifiedList.current = "progress"
						}}
						values={tasksProgress} 
						ref={waiting_ref}
						style={{height: "100%", overflowY: "auto"}} 
						layoutScroll
					>
						{
							tasksProgress.length !== 0 &&
							tasksProgress.map((task, index) => (
								<Task 
									key={task.id}
									item={task}
									container={waiting_ref}
									setValues={setValues}
									setDisplayWidget={setDisplayWidget}
									list={"progress"}
									setDraggedTask={setDraggedTask}
									isDragging={isDragging}
									setIsDragging={setIsDragging}
								/>
							))
						}
					</Reorder.Group>
				</div>
				<div className="flex-col tasks__done">
					<div>
						<h3>Done</h3>
						<div className="horizontal-line"></div>
					</div>
					<Reorder.Group
						axis="y" 
						onReorder={(e) => {
							setTasksDone(e);
							modifiedList.current = "done"
						}}
						values={tasksDone} 
						ref={waiting_ref}
						style={{height: "100%", overflowY: "auto"}} 
						layoutScroll
					>
						{
							tasksDone.length !== 0 &&
							tasksDone.map((task, index) => (
								<Task 
									key={task.id}
									item={task}
									container={waiting_ref}
									setValues={setValues}
									setDisplayWidget={setDisplayWidget}
									list={"done"}
									setDraggedTask={setDraggedTask}
									isDragging={isDragging}
									setIsDragging={setIsDragging}
								/>
							))
						}
					</Reorder.Group>
				</div>
			</div>

			{
				displayWidget ? 
				<>
					<div 
						id="insideWidget"
						className="grid-center"
						onClick={() => setDisplayWidget(false)}
						style={{cursor: "pointer", top: "0", right: "0"}}
					>
						<AddTask 
							values={values}
							setDisplayWidget={setDisplayWidget}
						/>
					</div>
				</> : null
			}
		</>
	);
}

export default Tasks;
