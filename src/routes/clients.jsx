import React, { useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import '../css/clients.css';

import EditProfile from '../components/subpages/clients/editProfile';
import AllChats from '../components/subpages/clients/allChats';
import AllProjects from '../components/subpages/clients/allProjects';

const Clients = () => {
	const { id, subpage } = useParams();
	return (
		<div id="clients">
			<div className="flex-row-between">
				<div className="flex-col-between client-data">
					<div className="client-data__link-info">
						<h3>Client can follow our job !</h3>
						<p>
							Click the icon to copy the link to the client page. Client will be able to view information about the project and its progresses.<br/>
							You can find this icon on each project thumbnail. Go to Client -> All Projects -> Choose a project and click the icon.
						</p>
						<img src="pictures/icons/link-icon.svg" alt="link" />
					</div>
					<div className="flex-row-between client-data__data">
						<nav>
							<ul className="flex-col-between sub-nav">
								<Link to={`/clients/${id}/edit`}>
									<li className={subpage === 'edit' ? "selected" : null}>Edit profile</li>
								</Link>
								<Link to={`/clients/${id}/chats`}>
									<li className={subpage === 'chats' ? "selected" : null}>All chats</li>
								</Link>
								<Link to={`/clients/${id}/projects`}>
									<li className={subpage === 'projects' ? "selected" : null}>All projects</li>
								</Link>
								<Link to={`/clients/${id}/invoices`}>
									<li className={subpage === 'invoices' ? "selected" : null}>Invoices</li>
								</Link>
								<Link to={`/clients/${id}/`}>
									<li className={subpage === '' ? "selected" : null}>Don't know</li>
								</Link>
							</ul>
						</nav>
						<div className="sub-page">
							{
								subpage === 'edit'
								? <EditProfile />
								: subpage === 'chats' 
								? <AllChats />
								: subpage === 'projects'
								? <AllProjects />
								: null
							}
						</div>
					</div>
				</div>
				<div className="client-info">
					
				</div>
			</div>
		</div>
	);
}

export default Clients;