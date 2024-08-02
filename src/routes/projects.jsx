import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

import '../css/projects.css';

const Projects = () => {
	const { id } = useParams();

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
		img: "pictures/icons/github.svg",
		link: data.identity.githublink
	}, {
		img: "pictures/icons/figma.svg",
		link: data.identity.figmalink
	}, {
		img: "pictures/icons/user.svg",
		link: ""
	}, {
		img: "",
		link: ""
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
			<div className="flex-row-between projects__header">
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
		</>
	);
}

export default Projects;