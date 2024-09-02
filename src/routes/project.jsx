import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";

import { useToast } from '../hooks/useToast';

import '../css/projects.css';

import { getProject } from '../requests/projects/getProject';
import { getProjectClient } from '../requests/projects/getProjectClient';
import { putNotes } from '../requests/projects/putNotes';

// import { getSpecifications } from '../requests/projects/getSpecifications';

import Specifications from '../components/subpages/projects/specifications';
import EditProject from '../components/subpages/projects/editProject';
import Invoices from '../components/subpages/projects/invoices';
import Tasks from '../components/subpages/projects/tasks';
import Delete from '../components/subpages/projects/delete';
import Note from '../components/subpages/projects/note';

const Project = () => {
	const toast = useToast();

	const [displayWidget, setDisplayWidget] = useState(false);
	const [displayNoteId, setDisplayNoteId] = useState(null);
	const [noteColor, setNoteColor] = useState(null);

	const { id, subpage } = useParams();

	const [registerFunc, setRegisterFunc] = useState(null);

	const [data, setData] = useState({
		identity: {},
		composition: {},
		note: [],
		rules: {}
	});

	const getLogoOfBrowser = () => {
		var isFirefox = navigator.userAgent.includes("Mozzila");
		if (isFirefox) return "pictures/icons/browser-firefox.svg";

		var isEdge = navigator.userAgent.includes("E");
		if (isEdge) return "pictures/icons/browser-edge.svg";

		var isChrome = navigator.userAgent.includes("Chrome");
		if (isChrome) return "pictures/icons/browser-chrome.svg";

		var isSafari = navigator.userAgent.includes("Safari");
		if (isSafari) return "pictures/icons/browser-safari.svg";

		return "pictures/icons/globe.svg"
	}

	const fourLinks = [{
		img: "pictures/icons/github.svg", link: data.identity?.githubLink == undefined ? "github" : data.identity?.githubLink
	}, {
		img: "pictures/icons/figma.svg", link: data.identity?.figmaLink == undefined ? "figma" : data.identity?.githubLink
	}, {
		img: "pictures/icons/user.svg", link: data.identity?.clientLink == undefined ? "client" : data.identity?.githubLink // Error cause not readable in _blank
	}, {
		img: getLogoOfBrowser(), link: data.identity?.websiteLink == undefined ? "website link" : data.identity?.githubLink
	}];

	useEffect(() => {
		getProject(id)
		.then(res => {
			setData(res.value)

			getProjectClient(id)
			.then(res => fourLinks[2].link = `/client/${res.value.id}`)
			.catch(res => toast(res.state, res.value));

			// Setting notes
			for (let i = 0; i < 5; i++) {
				setValue(`note.${i}.title`, res.value.note[i][0]);
				setValue(`note.${i}.content`, res.value.note[i][1]);
			}
		})
		.catch(res => toast(res.state, res.value));		
	}, []);

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

	const formMethods = useForm();
	const { 
		register,
		handleSubmit,
		formState: {
			errors
		},
		setValue,
		setError, getValues,
		clearErrors,
		watch,
	} = formMethods;

	const onSubmit = (data) => {
		// putNotes
		console.log(data)
		
		putNotes(data, id)
		.then(res => toast(res.state, res.value))
		.catch(res => toast(res.state, res.value));

		setDisplayNoteId(null);
		setNoteColor(null);
	}

	return (
		<>
			<div className="flex-row-between project__header">
				<div className="project__name">
					<h6>PROJECT NAME</h6>
					<h3>{data.identity?.name}</h3>
				</div>
				<div className="project__date">
					<h6>PROJECT DATE</h6>
					<h3>{data.identity?.startDate}</h3>
				</div>
				<div className="project__price">
					<h6>PROJECT PRICE</h6>
					<h3>{data.totalPrice?.toLocaleString()}€</h3>
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
					<nav className="flex-row">
						<ul className="flex-row-between sub-nav">
							<Link to={`/project/${id}/specifications`}>
								<li className={subpage === 'specifications' ? "selected" : null}>Technical specifications</li>
							</Link>
							<Link to={`/project/${id}/edit`}>
								<li className={subpage === 'edit' ? "selected" : null}>Edit project</li>
							</Link>
							<Link to={`/project/${id}/invoices`}>
								<li className={subpage === 'invoices' ? "selected" : null}>Invoices</li>
							</Link>
							<Link to={`/project/${id}/tasks`}>
								<li className={subpage === 'tasks' ? "selected" : null}>Tasks</li>
							</Link>
							<Link to={`/project/${id}/delete`}>
								<li className={subpage === 'delete' ? "selected" : null}>Delete project</li>
							</Link>
						</ul>

						{
							subpage === 'tasks' ? <button onClick={(e) => setDisplayWidget(true)} style={{margin: "auto 20px"}}>+ New task</button> : null
						}
					</nav>
					<div className="scroll-container">
					{
						subpage === 'specifications'
						? <Specifications />
						: subpage === 'edit'
						? <EditProject data={data} />
						: subpage === 'tasks'
						? <Tasks displayWidget={displayWidget} setDisplayWidget={setDisplayWidget} />
						: subpage === 'invoices'
						? <Invoices />
						: subpage === 'delete'
						? <Delete />
						:null
					}
					</div>
				</div>
				<FormProvider {...formMethods}>
					<AnimatePresence>
					{
						displayNoteId &&
						<div 
							id="insideWidget"
							className="grid-center"
							onClick={() => {
								setDisplayNoteId(null);
								setNoteColor(null);
							}}
							style={{cursor: "pointer", top: "0", right: "0"}}
						>
							<form onSubmit={handleSubmit(onSubmit)}>
								<motion.div layoutId={displayNoteId} transition={{duration: .2}}>
									<Note color={noteColor} index={displayNoteId} />
								</motion.div>
							</form>
						</div>
					}
					</AnimatePresence>
				</FormProvider>
			<div className="flex-col notes" style={{gap: "15px"}}>
			{
				[null, "#FF9A9A", "#FFB48A", "#FFD66E", "#DFFF84", "#AFECFF"].map((color, index) => {
					if (!color) return;
					return (
						<motion.div 
							layoutId={index}
							className="note"
							style={{
								backgroundColor: color,
								visibility: displayNoteId === index ? "hidden" : "visible"
							}}
							key={"note-" + color}
							onClick={() => {
								setDisplayNoteId(index);
								setNoteColor(color);
							}}
						>
						</motion.div>
					)
				})
			}
			</div>
		</>
	);
}

export default Project;