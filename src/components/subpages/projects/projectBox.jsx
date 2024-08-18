import React, { useState, useEffect, useRef } from 'react';

const ProjectBox = ({ project }) => {
	const [scrollBarWidth, setScrollBarWidth] = useState(0);

	const scrollBar = useRef(null);

	useEffect(() => {
		if (scrollBar.current === null) return;

		setScrollBarWidth(scrollBar.current.clientWidth);
	}, [scrollBar.current]);

	const percentage = Math.round(project.tasksDone / project.totalTasks * 100, 2);

	return (
		<div className="flex-col project-box" style={{gap: "15px"}}>
			<div className="flex-row" style={{gap: "10px"}}>
				<img src="pictures/icons/link-icon.svg" alt="link" style={{width: "24px"}}/>
				<img src="pictures/icons/folder-icon.svg" alt="link" style={{width: "24px"}}/>
				<p><b>{project.name}</b></p>
			</div>
			<div className="flex-row project__date" style={{gap: "5px"}}>
				<img src="pictures/icons/clock-icon.svg" alt="clock"/>
				<p>{project.date}</p>
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
	);
}

export default ProjectBox;