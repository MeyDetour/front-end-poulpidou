import React, {useEffect, useState} from 'react';
import {getClients} from "../../../requests/widgets/getClients";

import { useToast } from '../../../hooks/useToast';
import {getLogs} from "../../../requests/globals/getLogs";

const Logs = () => {
	const [logs, setLogs] = useState([]);
	const toast = useToast();
	useEffect(() => {
		getLogs()
			.then(res => setLogs(res.value))
			.catch(res => toast(res.state, res.value));
	}, [])
	return (
		<>
			<div className="warn-message">
				<p>To be transparent, since the application is still in development, we display the errors.</p>
			</div>

			<div className="scroll-container">
				<div>
					{
						logs.length !== 0
						? logs.map((log) => {
							return (
								<div className="flex-col log-row">
									<div className="flex-row" style={{gap: "10px"}}>
										<p className={"type " + (log.type === "ERROR" ? "error-type" : null)}>{log.type}</p>
										<p className="date">{log.date}</p>
										<p className="author">by {log.author}</p>
									</div>
									<div className="flex-row">
										<p style={{color: log.type === "Error" ? "var(--text-grey)" : null}}>{log.message}</p>
									</div>
								</div>
							);
						}) : null
					}
				</div>
			</div>
		</>
	);
}

export default Logs;