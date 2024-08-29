import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useToast } from '../../../hooks/useToast';

import { getClientProjects } from '../../../requests/clients/getClientProjects';

import { useParams } from 'react-router-dom';

const AllProjects = () => {
	const { id } = useParams();

	const toast = useToast();

	const [projects, setProjects] = useState([]);

	const [scrollBarWidth, setScrollBarWidth] = useState(0);

	const scrollBar = useRef(null);

	useEffect(() => {
		if (id == undefined) return;

		getClientProjects(id)
		.then(res => {
			setProjects(res.value)
			console.log(res.value)
		})
		.catch(res => toast(res.state, res.value));
	}, [id]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col" style={{gap: "10px"}}>
					{
						projects.length !== 0 ?
						projects.map((project) => {
							const percentage = project.totalTasks === 0 ? 100 : Math.round(project.doneTasks / project.totalTasks * 100, 2);

							return (
								<Link to={`/project/${project.id}/specifications`}>
									<div className="flex-col project" style={{gap: "5px"}}>
										<div className="flex-row-between">
											<div className="flex-row" style={{gap: "10px"}}>
												<img src="pictures/icons/folder-icon.svg" alt="folder"/>
												<img src="pictures/icons/link-icon.svg" alt="folder" style={{width: "24px", height: "24px"}} onClick={(e) => {
													navigator.clipboard.writeText("/client-access/" + project.uuid);
													toast("OK", "The last client project page link was copied to your clipboard.");
													e.preventDefault();
												}}/>
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
												<p>{project.doneTasks}/{project.totalTasks}</p>
											</div>
											<div className="progress__bar" ref={scrollBar}>
												<div className="progress__bar-value" style={{width: `calc(${percentage} * 100%/100`}}></div>
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