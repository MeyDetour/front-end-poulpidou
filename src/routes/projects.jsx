import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ProjectBox from '../components/subpages/projects/projectBox';

import { getAllProjects } from '../requests/projects/getAllProjects';

import { useToast } from '../hooks/useToast';

const Projects = () => {
	const toast = useToast();

	const [projects, setProjects] = useState({
		currents: [],
		others: []
	});

	console.log(projects)

	useEffect(() => {
		getAllProjects()
		.then((res) => {
			setProjects(res.value);
		})
		.catch((res) => toast("Error", "Projects couldn't be load."));
	}, []);

	return (
		<div className="scroll-container projects">
			<h3>Current projects</h3>
			<div className="flex-row" style={{gap: "20px"}}>
				{
					projects.currents.length > 0 &&
					projects.currents.map((elm) => {
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