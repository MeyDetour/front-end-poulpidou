import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import '../css/home.css';

import LineChart from '../components/subpages/home/lineChart';
import {getCurrentUser} from "../requests/settings/getCurrentUser";
import {getChart} from "../requests/home/getChart";
import { getNextTasks } from "../requests/home/getNextTasks";
import { getCurrentProjects } from "../requests/home/getCurrentProjects";
import {useToast} from "../hooks/useToast";

const HomePage = () => {
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);

	const [type, setType] = useState("projects");
	const [time, setTime] = useState("1m");
	const [values, setValues] = useState({});

	const toast = useToast();

	useEffect(() => {
		getChart(type,time)
		.then(res => {
			console.log(res)
			setValues(res.value)
		})
		.catch(res => toast(res.state, res.value));
	}, [type,time]);

	useEffect(() => {
		getNextTasks()
		.then(res => setTasks(res.value))
		.catch(res => toast(res.state, res.value));

		getCurrentProjects()
		.then(res => setProjects(res.value))
		.catch(res => toast(res.state, res.value));
	}, []);

	const scrollBar = useRef(null);

	return (
		<>
			<div className="scroll-container">
				<div className="flex-row-between"> {/* Max height */}
					<div className="flex-col tasks-to-do">
						<div className="tasks-to-do__header">
							<h2>Next tasks to do:</h2>
						</div>
						<div className="horizontal-line" style={{height: "1px"}}></div>
						<div className="tasks-to-do__content">
							{
								tasks && tasks.map(task => {

								})
							}
						</div>
					</div>
					<div className="flex-col current-projects">
						<div className="current-projects__header">
							<h2>Current projects:</h2>
						</div>
						<div className="horizontal-line" style={{height: "1px"}}></div>
						<div className="scroll-container" style={{marginTop: "0", paddingTop: "0"}}>
							<div className="flex-col current-projects__content">
								{
									projects && [...projects].map(project => {
										const percentage = project.totalTasks === 0 ? 0 : Math.round(project.doneTasks / project.totalTasks * 100, 2);
										console.log(project)
										return (
											<Link to={`/project/${project.id}/specifications`} key={project}>
												<div className="flex-col project" style={{gap: "5px"}}>
													<div className="flex-row-between">
														<div className="flex-row" style={{gap: "10px"}}>
															<img src="pictures/icons/folder-icon.svg" alt="folder"/>
															<img src="pictures/icons/link-icon.svg" alt="folder" style={{width: "24px", height: "24px"}} onClick={(e) => {
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
															<div className="progress__bar-value" style={{width: `calc(${percentage} * 100%/100`}}></div>
														</div>
														<p className="progress__value">
															{percentage}%
														</p>
													</div>
												</div>
											</Link>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
				<div className="horizontal-line"></div>
				<div className="flex-col-between chart-section">
					<h2>Some stats just for you:</h2>
					<div className="flex-row" style={{gap: "50px", marginTop: "20px"}}>
						<select name="" id="" value={type} onChange={e => setType(e.target.value)}>
							<option value="projects">Projects</option>

							<option value="incomes">Incomes</option>
							<option value="tasks">Tasks</option>
						</select>
						<div className="flex-row hor-radio">
							<div className={`hor-radio__opt ${time === '10yrs' && 'selected'}`} onClick={() => setTime('10yrs')}>10 yrs</div>
							<div className={`hor-radio__opt ${time === '1yr' && 'selected'}`} onClick={() => setTime('1yr')}>1 yr</div>
							<div className={`hor-radio__opt ${time === '1m' && 'selected'}`} onClick={() => setTime('1m')}>1 m</div>
						</div>
					</div>
					<LineChart values={values} time={time} />
				</div>
			</div>
		</>
	);
}

export default HomePage;