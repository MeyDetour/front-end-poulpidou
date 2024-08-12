import React from 'react';

import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
	const error = useRouteError();

	return (
		<>
			<div id="error-page">
				<div className="img-container">
					<img src="pictures/poulpidou.svg" alt="Poulpidou"/>
				</div>
				<div className="bottom">
					<h1>PAGE 404 NOT FOUND</h1>
					<p>You got lost among octopuses.</p>
					<Link to={`/`}><u>Go back to home page</u></Link>
				</div>
			</div>
		</>
	);
}

export default ErrorPage;
