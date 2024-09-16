import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

import '../css/home.css';

import LineChart from '../components/subpages/home/lineChart';
import {getChart} from "../requests/home/getChart";
import {getNextTasks} from "../requests/home/getNextTasks";
import {useToast} from "../hooks/useToast";
import {getCurrentProjects} from "../requests/home/getCurrentProjects";

const HomePage = () => {
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);

	const [type, setType] = useState("projects");
	const [time, setTime] = useState("30days");
	const [values, setValues] = useState({});

	const toast = useToast();
	useEffect(() => {
		getNextTasks()
			.then(res => {
				setTasks(res.value);
			})
			.catch(res => toast(res.state, res.value));

		getCurrentProjects()
			.then(res => setProjects(res.value))
			.catch(res => toast(res.state, res.value));
	}, []);

	useEffect(() => {
		getChart(type, time)
			.then(res => {
				setValues(res.value)
				console.log(res.value)
			})
			.catch(res => toast(res.state, res.value));
	}, [type, time]);


	const scrollBar = useRef(null);

	return (
		<>
			<div className="scroll-container">
				<div className="flex-row-between" style={{height:"39vh", marginBottom:"60px"}}> {/* Max height */}
					<div className="flex-col tasks-to-do">
						<div className="tasks-to-do__header">
							<h2>Next tasks to do:</h2>
						</div>
						<div className="horizontal-line" style={{height: "1px"}}></div>
						<div className="tasks-to-do__content">
							{
								tasks && [...tasks].map(task => {

									return (
										<Link to={`/project/${task.project_id}/specifications`} key={task.id}>
											<div className="task">
												<div className={"flex-row-between"}>
													<span className={"title"}>{task.projectName} #{task.status}</span>
													<span className={"date"}>{task.dueDate}</span>

												</div>
												<span className={"taskName"}>{task.name} ({task.category})</span>
											</div>
										</Link>
									)

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
										return (
											<Link to={`/project/${project.id}/specifications`} key={project.id}>
												<div className="flex-col project" style={{gap: "5px"}}>
													<div className="flex-row-between">
														<div className="flex-row" style={{gap: "10px"}}>
															<img src="pictures/icons/folder-icon.svg" alt="folder"/>
															<img src="pictures/icons/link-icon.svg" alt="folder"
																 style={{width: "24px", height: "24px"}} onClick={(e) => {
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
															<div className="progress__bar-value"
																 style={{width: `calc(${percentage} * 100%/100`}}></div>
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
							<div className={`hor-radio__opt ${time === '10years' && 'selected'}`}
								 onClick={() => setTime('10years')}>10 years
							</div>
							<div className={`hor-radio__opt ${time === '1year' && 'selected'}`}
								 onClick={() => setTime('1year')}>1 year
							</div>
							<div className={`hor-radio__opt ${time === '3months' && 'selected'}`}
								 onClick={() => setTime('3months')}>3 months
							</div>
							<div className={`hor-radio__opt ${time === '30days' && 'selected'}`}
								 onClick={() => setTime('30days')}>30 days
							</div>
							<div className={`hor-radio__opt ${time === '7days' && 'selected'}`}
								 onClick={() => setTime('7days')}>7 days
							</div>
						</div>
					</div>
					<LineChart values={values} time={time}/>
				</div>
			</div>
		</>
	);
}

export default HomePage;