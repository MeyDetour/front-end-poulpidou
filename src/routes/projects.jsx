import React, {useState} from 'react';


import CreateProject from "../components/widgets/createProject";
import ResearchProject from "../components/widgets/researchProject";
import {useParams} from "react-router-dom";

const Projects = () => {
	const {id} = useParams();

	const [displayWidget, setDisplayWidget] = useState(id === undefined ? "allProjects" : null);

	return (
		<>
			{
				displayWidget === "allProjects" 
				? (
					<div
						id="insideWidget"
						className="grid-center"
						style={{cursor: typeof id === "undefined" ? "default" : "cursor"}}
					>

						<ResearchProject setDisplayWidget={setDisplayWidget} />
					</div>
				) : displayWidget === "newProject" && (
					<div
						id="insideWidget"
						className="grid-center"
						onClick={() => setDisplayWidget("allProjects")}
						style={{cursor: typeof id === "undefined" ? "default" : "cursor"}}
					>
						<CreateProject setDisplayWidget={setDisplayWidget}/>
					</div>
				)
			}
		</>
	);
}

export default Projects;