import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";

import '../css/projects.css';

import Specifications from '../components/subpages/projects/specifications';
import Invoices from '../components/subpages/projects/invoices';
import Tasks from '../components/subpages/projects/tasks';

const Projects = () => {
	const [displayWidget, setDisplayWidget] = useState(false);

	const { id, subpage } = useParams();

	const [registerFunc, setRegisterFunc] = useState(null);

	const [data, setData] = useState({
		totalPrice: 14350,
		identity: {
			name: "F&B-Database",
			startDate: "17/02/2023",
			githublink: "https://github.com/MeyDetour/front-end-poulpidou",
			figmalink: "https://www.figma.com/proto/4kEDY8BclhjBu37t7hZ2J7/Poulpidou?node-id=0-1&t=WsN7wVOIOXh0Jc3R-1"
		}
	});

	const fourLinks = [{
		img: "pictures/icons/github.svg", link: data.identity.githublink
	}, {
		img: "pictures/icons/figma.svg", link: data.identity.figmalink
	}, {
		img: "pictures/icons/user.svg", link: ""
	}, {
		img: "", link: "_"
	}];

	// Animation of the header
	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2
			}
		}
	};

	const item = {
		hidden: { y: 10, opacity: 0 },
		visible: { y: 0, opacity: 1 }
	};

	return (
		<>
			<div className="flex-row-between project__header">
				<div className="project__name">
					<h6>PROJECT NAME</h6>
					<h3>{data.identity.name}</h3>
				</div>
				<div className="project__date">
					<h6>PROJECT DATE</h6>
					<h3>{data.identity.startDate}</h3>
				</div>
				<div className="project__price">
					<h6>PROJECT PRICE</h6>
					<h3>{data.totalPrice.toLocaleString()}€</h3>
				</div>
				<div className="project__link">
					<motion.ul
						className="links-container"
						variants={container}
						initial="hidden"
						animate="visible"
					>
						{
							fourLinks.map((elm) => (
								<motion.li
									key={elm.link}
									className="grid-center link"
									variants={item}

									onClick={(e) => window.open(elm.link, '_blank')}
								>
									<img src={elm.img} alt=""/>
								</motion.li>
							))
						}
					</motion.ul>
				</div>
			</div>

			<div className="project__content">
				<div className="flex-row-between">
					<ul className="flex-row-between sub-nav">
						<Link to={`/projects/${id}/specifications`}>
							<li className={subpage === 'specifications' ? "selected" : null}>Technical specifications</li>
						</Link>
						<Link to={`/projects/${id}/edit`}>
							<li className={subpage === 'edit' ? "selected" : null}>Edit project</li>
						</Link>
						<Link to={`/projects/${id}/invoices`}>
							<li className={subpage === 'invoices' ? "selected" : null}>Invoices</li>
						</Link>
						<Link to={`/projects/${id}/tasks`}>
							<li className={subpage === 'tasks' ? "selected" : null}>Tasks</li>
						</Link>
					</ul>

					{
						subpage === 'tasks' ? <button onClick={(e) => setDisplayWidget(true)}>+ New task</button> : null
					}
				</div>
				<div className="scroll-container">
					{
						subpage === 'specifications'
						? <Specifications />
						: subpage === 'edit'
						? null
						: subpage === 'tasks'
						? <Tasks displayWidget={displayWidget} setDisplayWidget={setDisplayWidget} />
						: subpage === 'invoices'
						? <Invoices />
						: null
					}
				</div>
			</div>
		</>
	);
}

export default Projects;