import React, { useState } from 'react';

const Logs = () => {
	const [logs, setLogs] = useState([{
		id: 0,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Internal Servor Error : Doctrine\\ORM\\Persisters\\Entity\\BasicEntityPersister::getSelectConditionStatementSQL(): Argument #1 ($field) must be of type string, int given, called in /home/mey/Documents/symfonyProject/poulpidou/vendor/doctrine/orm/src/Persisters/Entity/BasicEntityPersister.php on line 1719 at |/home/mey/Documents/symfonyProject/poulpidou/vendor/doctrine/orm/src/Persisters/Entity/BasicEntityPersister.php | line |1563",
		type: "Error",
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}, {
		id: 1,
		date: "29-07-2024 08:33:33",
		author: "Maxence ABRILE",
		message: "Create new client (15 | Bonjour ABRILE) ",
		type: "POST|PUT"
	}]);

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
										<p className={"type " + (log.type === "Error" ? "error-type" : null)}>{log.type}</p>
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