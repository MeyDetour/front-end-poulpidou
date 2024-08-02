import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const Searchbar = () => {
	const [search, setSearch] = useState('');
	
	const [projectsResult, setProjectsResult] = useState([{
		name: "Vitrine / Logiciel de Psychologie",
		meta: "- 01/01/2024 (Gaëlle GHIZOLI)",
		link: ""
	}, {
		name: "Poulpidou",
		meta: "- 01/07/2024 (Personel)",
		link: ""
	}]);

	const [clientsResult, setClientsResult] = useState([{
		name: "M Philibert du POMMIER",
		meta: "- 01/01/2024 (3 projects)",
		link: ""
	}]);

	const [tabsResult, setTabsResult] = useState([{
		name: "Lorem",
		link: ""
	}, {
		name: "Ipsum",
		link: ""
	}, {
		name: "Dolor",
		link: ""
	}, {
		name: "Sit",
		link: ""
	}, {
		name: "Amet",
		link: ""
	}]);

	const [commandsResult, setCommandsResult] = useState([{
		command: "Ctrl+K",
		action: "Open search tool"
	}, {
		command: "Ctrl+N",
		action: "Open new project"
	}]);

	return (
		<>
			<div id="searchbar" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__searchbar">
					<input type="search" value={search} placeholder="Search for a something..." onChange={(e) => setSearch(e.value)}/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<h3 className="widget-title">Projects</h3>
								<div className="sub-container">
									{
										projectsResult.length !== 0 ?
										projectsResult.map((elm) => {
											return (
												<Link to={elm.link}>
													<div className="flex-row long-result">
														<p>{elm.name}
															<sub>{elm.meta}</sub>
														</p>
													</div>
												</Link>
											);
										}) : null
									}
								</div>
							</div>
						</div>
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<h3 className="widget-title">Clients</h3>
								<div className="sub-container">
									{
										clientsResult.length !== 0 ?
										clientsResult.map((elm) => {
											return (
												<Link to={elm.link}>
													<div className="flex-row long-result">
														<p>{elm.name}
															<sub>{elm.meta}</sub>
														</p>
													</div>
												</Link>
											);
										}) : null
									}
								</div>
							</div>
						</div>
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<h3 className="widget-title">Tabs</h3>
								<div className="flex-row-wrap sub-container">
									{
										tabsResult.length !== 0 ?
										tabsResult.map((elm) => {
											return (
												<Link to={elm.link}>
													<div className="short-result">
														<p>{elm.name}</p>
													</div>
												</Link>
											);
										}) : null
									}
								</div>
							</div>
						</div>
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<h3 className="widget-title">Shortcuts & commands</h3>
								<div className="sub-container">
									{
										commandsResult.length !== 0 ?
										commandsResult.map((elm) => {
											return (
												<div className="flex-row">
														<kbd>{elm.command}</kbd>
													<p>{elm.action}</p>
												</div>
											);
										}) : null
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

export default Searchbar;