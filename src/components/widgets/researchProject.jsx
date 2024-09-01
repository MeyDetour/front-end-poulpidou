import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useSearchbar } from '../../hooks/useSearchbar';
import {getAllProjects} from "../../requests/projects/getAllProjects";

const ResearchClient = ({ setDisplayWidget }) => {
	const toast = useToast();
	const [search, setSearch] = useState('');

	const [projects, setProjects] = useState({
		currents: [], // Notez l'utilisation de "currents" et "others"
		others: []
	});
	const [clientsDisplay, setClientsDisplay] = useState([]);

	const searchAmong = useSearchbar();
	const scrollBar = useRef(null);
	const searchbar = useRef(null);

	useEffect(() => {
		getAllProjects()
			.then((res) => {
				console.log(res)
				setProjects(res.value);
			})
			.catch(() => toast("Error", "Projects couldn't be loaded."));
	}, []);

	useEffect(() => {
		const research = searchAmong([...projects.currents, ...projects.others], ["name"], search, "i");
		setClientsDisplay([...new Set(research)]);
	}, [search]);

	useEffect(() => {
		if (!searchbar.current) return;
		searchbar.current.focus();
	}, [searchbar]);

	return (
		<>
			<div id="researchClient" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className={"flex-row-between"}>
					<div className="research__searchbar">
						<input
							type="search"
							value={search}
							placeholder="Search for a project..."
							ref={searchbar}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<button onClick={() => setDisplayWidget("newProject")}>New Project</button>
				</div>

				<div className="research__result">
					<div className="scroll-container">
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<div className="flex-col sub-container">
									<h3>Current projects</h3>
									{
										projects.currents.length > 0 ? (
											projects.currents.map((project) => {
												const percentage = project.totalTasks === 0 ? 0 : Math.round((project.doneTasks / project.totalTasks) * 100);

												return (
													<Link key={project.id} to={`/project/${project.id}/specifications`}>
														<div className="flex-col project" style={{gap: "5px"}}>
															<div className="flex-row-between">
																<div className="flex-row" style={{gap: "10px"}}>
																	<img src="pictures/icons/folder-icon.svg" alt="folder" />
																	<img src="pictures/icons/link-icon.svg" alt="link"
																		 style={{width: "24px", height: "24px"}}
																		 onClick={(e) => {
																			 navigator.clipboard.writeText(window.location.origin + "/client-access/" + project.uuid);
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
																	<div className="progress__bar-value" style={{width: `${percentage}%`}}></div>
																</div>
																<p className="progress__value">
																	{percentage}%
																</p>
															</div>
														</div>
													</Link>
												)
											})
										) : (
											<p>No current projects available.</p>
										)
									}

								</div>
							</div>
						</div><div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<div className="flex-col sub-container">

									<h3>Ended projects</h3>
									{
										projects.others.length > 0 ? (
											projects.others.map((project) => {
												const percentage = project.totalTasks === 0 ? 0 : Math.round((project.doneTasks / project.totalTasks) * 100);

												return (
													<Link key={project.id} to={`/project/${project.id}/specifications`}>
														<div className="flex-col project" style={{gap: "5px"}}>
															<div className="flex-row-between">
																<div className="flex-row" style={{gap: "10px"}}>
																	<img src="pictures/icons/folder-icon.svg" alt="folder" />
																	<img src="pictures/icons/link-icon.svg" alt="link"
																		 style={{width: "24px", height: "24px"}}
																		 onClick={(e) => {
																			 navigator.clipboard.writeText(window.location.origin + "/client-access/" + project.uuid);
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
																	<div className="progress__bar-value" style={{width: `${percentage}%`}}></div>
																</div>
																<p className="progress__value">
																	{percentage}%
																</p>
															</div>
														</div>
													</Link>
												)
											})
										) : (
											<p>No ended projects available.</p>
										)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ResearchClient;
