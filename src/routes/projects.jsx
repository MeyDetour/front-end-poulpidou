import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import ProjectBox from '../components/subpages/projects/projectBox';

const Projects = () => {
	const [projects, setProjects] = useState({
		current: [{
			id: 0,
			name: "F&B-Database",
			date: '31/08/24',
			tasksDone: '7',
			totalTasks: '10'
		}, {
			id: 1,
			name: "F&B-Database",
			date: '31/08/24',
			tasksDone: '8',
			totalTasks: '10'
		}],
		others: [{
			id: 2,
			name: "F&B-Database",
			date: '31/08/24',
			tasksDone: '10',
			totalTasks: '10'
		}, {
			id: 2,
			name: "F&B-Database",
			date: '31/08/24',
			tasksDone: '10',
			totalTasks: '10'
		}, {
			id: 2,
			name: "F&B-Database",
			date: '31/08/24',
			tasksDone: '10',
			totalTasks: '10'		
		}]
	});

	return (
		<div className="scroll-container projects">
			<h3>Current projects</h3>
			<div className="flex-row" style={{gap: "20px"}}>
				{
					projects.current.length > 0 &&
					projects.current.map((elm) => {
						return (
							<Link to={`/project/${elm.id}/specifications`}>
								<ProjectBox project={elm} />
							</Link>
						);
					})
				}
			</div>
			<div className="horizontal-line" style={{marginBlock: "40px"}}></div>
			<h3>Ended projects</h3>
			<div className="flex-row" style={{gap: "20px"}}>
				{
					projects.others.length > 0 &&
					projects.others.map((elm) => {
						return (
							<Link to={`/project/${elm.id}/specifications`}>
								<ProjectBox project={elm} />
							</Link>
						);
					})
				}
			</div>
		</div>
	);
}

export default Projects;