import React from 'react';

import LineChart from '../components/subpages/home/lineChart';

const HomePage = () => {
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
					<div className="flex-row" style={{gap: "100px", marginTop: "20px"}}>
						<select name="" id="">
							<option value="incomes">Incomes</option>
							<option value="incomes">Project</option>
							<option value="incomes">Tasks</option>
						</select>
					</div>
					<LineChart />
				</div>
			</div>
		</>
	);
}

export default HomePage;