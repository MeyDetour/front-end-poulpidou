import React, { useState, useRef } from 'react';
import { Reorder } from 'framer-motion';

import Task from './task';

const Tasks = () => {
	const [tasksWaiting, setTasksWaiting] = useState([{
		id: 0,
		title: "New task",
		content: "Labore fugiat amet voluptate sit quis reprehenderit dolor eiusmod ad fugiat mollit officia est minim ut sint officia voluptate ut laboris aute consectetur labore minim eiusmod sint aute in sed incididunt.",
		category: "dev",
		dueDate: "07/08/2024",
		author: {
			firstName: "Maxence",
			lastName: "ABRILE"
		}
	}, {
		id: 1,
		title: "New task (2)",
		content: "Quis ut.",
		category: "design",
		dueDate: "08/08/2024",
		author: {
			firstName: "Maxence",
			lastName: "ABRILE"
		}
	}]);

	const [tasksProgress, setTasksProgress] = useState([{
		id: 2,
		title: "New task (3)",
		content: "Dolore sed laborum reprehenderit.",
		category: "design",
		dueDate: "07/08/2024",
		author: {
			firstName: "Maxence",
			lastName: "ABRILE"
		}
	}]);

	const [tasksDone, setTasksDone] = useState([{
		id: 3,
		title: "New task (4)",
		content: "Lorem ipsum velit sit eiusmod sed id proident ad ex voluptate sunt ut nulla pariatur nulla aute occaecat voluptate.",
		category: "dev",
		dueDate: "07/08/2024",
		author: {
			firstName: "Maxence",
			lastName: "ABRILE"
		}
	}]);

	const waiting_ref = useRef(null);
	const progress_ref = useRef(null);
	const done_ref = useRef(null);

	return (
		<div className="flex-row-between tasks">
			<div className="flex-col tasks__waiting">
				<div>
					<h3>Waiting</h3>
					<div className="horizontal-line"></div>
				</div>
				<Reorder.Group
					axis="y" 
					onReorder={setTasksWaiting}
					values={tasksWaiting} 
					ref={waiting_ref}
					style={{height: "100%", overflowY: "auto"}} 
					layoutScroll
				>
					{
						tasksWaiting.length !== 0 ?
						tasksWaiting.map((task, index) => (
							<Task key={task.id} item={task} container={waiting_ref}/>
						)) : null
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
					onReorder={setTasksProgress}
					values={tasksProgress} 
					ref={waiting_ref}
					style={{height: "100%", overflowY: "auto"}} 
					layoutScroll
				>
					{
						tasksProgress.length !== 0 ?
						tasksProgress.map((task, index) => (
							<Task key={task.id} item={task} container={waiting_ref}/>
						)) : null
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
					onReorder={setTasksDone}
					values={tasksDone} 
					ref={waiting_ref}
					style={{height: "100%", overflowY: "auto"}} 
					layoutScroll
				>
					{
						tasksDone.length !== 0 ?
						tasksDone.map((task, index) => (
							<Task key={task.id} item={task} container={waiting_ref}/>
						)) : null
					}
				</Reorder.Group>
			</div>
		</div>
	);
}

export default Tasks;
