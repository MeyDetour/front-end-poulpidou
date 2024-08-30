import React, { useState, useEffect, useRef } from 'react';

import { useSearchbar } from '../../hooks/useSearchbar';

import { Link } from 'react-router-dom';

const Searchbar = () => {
	const [search, setSearch] = useState('');
	
	const [projectsResult, setProjectsResult] = useState([{
		id: 0,
		name: "FB-Database",
		firstName: "Maxence",
		lastName: "ABRILE"
	}, {
		id: 1,
		name: "OSIMI",
		firstName: "Maxence",
		lastName: "Maxence"
	}, {
		id: 2,
		name: "ITOW",
		firstName: "Maxence",
		lastName: "ABRILE"
	}, {
		id: 3,
		name: "Poulpidou",
		firstName: "Mey",
		lastName: "DETOUR"
	}]);
	const [projectsResultDisplay, setProjectsResultDisplay] = useState([]);

	const [clientsResult, setClientsResult] = useState([{
		id: 0,
		firstName: "Maxence",
		lastName: "ABRILE"
	}, {
		id: 1,
		firstName: "Maxence",
		lastName: "Maxence"
	}, {
		id: 2,
		firstName: "Maxence",
		lastName: "ABRILE2"
	}, {
		id: 3,
		firstName: "Mey",
		lastName: "DETOUR"
	}]);
	const [clientsResultDisplay, setClientsResultDisplay] = useState([]);

	// const [tabsResult, setTabsResult] = useState([]);

	const [commandsResult, setCommandsResult] = useState([{
		command: "Ctrl+K",
		action: "Open search tool"
	}, {
		command: "Ctrl+N",
		action: "Open new project"
	}]);

	const searchAmong = useSearchbar();

	const searchbar = useRef(null);

	// Syste of searchbar research
	useEffect(() => {
		const projectsResearch = searchAmong(projectsResult, ["name"], search, "i");
		const clientsResearch = searchAmong(clientsResult, ["firstName", "lastName"], search, "i");

		// We get all the clients name (and only their name)
		const clientsName = clientsResearch.map(elm => elm.firstName + ' ' + elm.lastName).join(' ').split(' ').join(' ');
		// We get all project with as name those of the last research
		const projectsFromClient = clientsName.length > 0 ? searchAmong(projectsResult, ["firstName", "lastName"], clientsName, "i", true) : [];

		// We get the name of all owners of each projects
		const projectsClientName = projectsResearch.map(elm => elm.firstName + ' ' + elm.lastName).join(' ').split(' ').join(' ');
		// We get the clients of the last research
		const clientsFromProject = projectsClientName.length > 0 ? searchAmong(clientsResult, ["firstName", "lastName"], projectsClientName, "i", true) : [];

		setProjectsResultDisplay([...new Set([...projectsResearch, ...projectsFromClient])]);
		setClientsResultDisplay([...new Set([...clientsResearch, ...clientsFromProject])]);
	}, [search]);

	useEffect(() => {
		if (!searchbar.current) return;

		searchbar.current.focus();
	}, [searchbar]);

	return (
		<>
			<div id="searchbar" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__searchbar">
					<input
						type="search"
						value={search}
						placeholder="Search for a something..."
						onChange={(e) => setSearch(e.target.value)}
						ref={searchbar}
					/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						{
							projectsResultDisplay.length !== 0 && <div className="flex-row">
							<div className="vertical-line"></div>
								<div>
									<h3 className="widget-title">Projects</h3>
									<div className="sub-container">
										{
											projectsResultDisplay.map((elm) => {
												return (
													<Link to={elm.link}>
														<div className="flex-row long-result">
															<p>{elm.name}
																<sub>{elm.meta}</sub>
															</p>
														</div>
													</Link>
												);
											})
										}
									</div>
								</div>
							</div>
						}
						{
							clientsResultDisplay.length !== 0 && <div className="flex-row">
							<div className="vertical-line"></div>
								<div>
									<h3 className="widget-title">Clients</h3>
									<div className="sub-container">
										{
											clientsResultDisplay.map((elm) => {
												return (
													<Link to={elm.link}>
														<div className="flex-row long-result">
															<p>{elm.lastName} {elm.firstName}
																<sub>{elm.meta}</sub>
															</p>
														</div>
													</Link>
												);
											})
										}
									</div>
								</div>
							</div>
						}
						{/*<div className="flex-row">
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
						</div>*/}
						{
							commandsResult.length !== 0 && <div className="flex-row">
							<div className="vertical-line"></div>
								<div>
									<h3 className="widget-title">Shortcuts & commands</h3>
									<div className="sub-container">
										{
											commandsResult.map((elm) => {
												return (
													<div className="flex-row">
															<kbd>{elm.command}</kbd>
														<p>{elm.action}</p>
													</div>
												);
											})
										}
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default Searchbar;