import React, { useState, useEffect } from 'react';
import '../css/home.css';

import LineChart from '../components/subpages/home/lineChart';
import {getCurrentUser} from "../requests/settings/getCurrentUser";
import {getChart} from "../requests/globals/getChart";
import {useToast} from "../hooks/useToast";

const HomePage = () => {
	const [type, setType] = useState("projects");
	const [time, setTime] = useState("1m");

	const toast = useToast();
	console.log( type)
	console.log(time)
	useEffect(() => {
		getChart()
			.then(res => {

			})
			.catch(res => toast(res.state, res.value));
	}, [type,time])
	return (
		<>
			<div className="scroll-container">
				<div className="flex-row-between"> {/* Max height */}
					<div className="tasks-to-do">
						<h2>Next tasks to do:</h2>
					</div>
					<div className="tasks-to-do">
						<h2>Current projects:</h2>
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
					<LineChart type={type} time={time} />
				</div>
			</div>
		</>
	);
}

export default HomePage;