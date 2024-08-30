import React, { useState, useEffect, useRef } from 'react';

import { getClients } from '../../requests/widgets/getClients';

import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/useToast';
import { useSearchbar } from '../../hooks/useSearchbar';

const ResearchClient = ({ setDisplayWidget }) => {
	const [search, setSearch] = useState('');

	const toast = useToast();

	const [clients, setClients] = useState([]);
	const [clientsDisplay, setClientsDisplay] = useState([]);

	const searchAmong = useSearchbar();

	const searchbar = useRef(null);

	useEffect(() => {
		getClients()
		.then(res => {
			setClients(res.value)
			console.log(res.value)
			setClientsDisplay(res.value)
		})
		.catch(res => toast(res.state, res.value));
	}, []);

	useEffect(() => {
		const research = searchAmong(clients, ["firstName", "lastName"], search, "i");
		setClientsDisplay([...new Set(research)]);
	}, [search]);

	useEffect(() => {
		if (!searchbar.current) return;

		searchbar.current.focus();
	}, [searchbar]);

	return (
		<>
			<div id="researchClient" className="flex-col widget" onClick={(event) => event.stopPropagation()}>
				<div className="research__searchbar">
					<input
						type="search"
						value={search}
						placeholder="Search for a client..."
						ref={searchbar}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="research__result">
					<div className="scroll-container">
						<div className="flex-row">
							<div className="vertical-line"></div>
							<div>
								<div className="flex-col sub-container">
									{
										clientsDisplay.map((elm) => {
											return (
												<Link to={`/client/${elm.id}`}>
													<div className="flex-row-between long-result" onClick={() => setDisplayWidget(false)}>
														<div className="flex-col">
															<p><b>{elm.lastName} {elm.firstName}</b>
																<sub>- {elm.createdAt}</sub>
															</p>
															<p><i>We don't know how many {elm.currentProjects} current project{elm.currentProjects !== 1 && "s" } the client has.</i></p>
														</div>
														<div>
															<div className={ elm.online ? "online" : "offline" }></div>
															<p>{ elm.online ? "Online" : "Offline" }</p>
														</div>
													</div>
												</Link>
											);
										})
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

export default ResearchClient;