import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AllProjects = () => {
	const [projects, setProject] = useState([{
		name: "F&B-Database",
		date: '31/08/24',
		tasksDone: '7',
		totalTasks: '10'
	}, {
		name: "SQL-Grapher",
		date: 'undefined',
		tasksDone: '2',
		totalTasks: '10'
	}]);

	const [scrollBarWidth, setScrollBarWidth] = useState(0);

	const scrollBar = useRef(null);

	useEffect(() => {
		if (scrollBar.current === null) return;

		setScrollBarWidth(scrollBar.current.clientWidth);
	}, [scrollBar.current]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col" style={{gap: "10px"}}>
					{
						projects.length !== 0 ?
						projects.map((project) => {
							const percentage = Math.round(project.tasksDone / project.totalTasks * 100, 2);
							return (
								<Link>
									<div className="flex-col project" style={{gap: "5px"}}>
										<div className="flex-row-between">
											<div className="flex-row" style={{gap: "10px"}}>
												<img src="pictures/icons/folder-icon.svg" alt="folder"/>
												<img src="pictures/icons/link-icon.svg" alt="folder" style={{width: "24px", height: "24px"}}/>
												<p>{project.name}</p>
											</div>
											<div className="flex-row project__date" style={{gap: "5px"}}>
												<img src="pictures/icons/clock-icon.svg" alt="clock"/>
												<p>{project.date}</p>
											</div>
										</div>
										<div className="flex-row-between">
											<div className="flex-row progres__task">
												<img src="pictures/icons/tasks-icon.svg" alt="tasks"/>
												<p>{project.tasksDone}/{project.totalTasks}</p>
											</div>
											<div className="progress__bar" ref={scrollBar}>
												<div className="progress__bar-value" style={{width: percentage * scrollBarWidth/100}}></div>
											</div>
											<p className="progress__value">
												{percentage}%
											</p>
										</div>
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

export default AllProjects;