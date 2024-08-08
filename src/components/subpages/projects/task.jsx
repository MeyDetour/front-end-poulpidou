import React, { useRef } from 'react';
import { Reorder, useMotionValue } from 'framer-motion';

const Task = ({ item, container }) => {
	const ownRef = useRef(null);

	const handleDrag = (e) => {
		if (ownRef.current === null) return;

		ownRef.current.style.boxShadow = "0 5px 5px rgba(0,0,0,0.2)";
	}

	const handleDragEnd = (e) => {
		if (ownRef.current === null) return;

		ownRef.current.style.boxShadow = "none";
	}

	return (
		<Reorder.Item 
			value={item}
			id={item}
			dragConstrains={container}
			onDrag={handleDrag}
			onDragEnd={handleDragEnd}
			style={{ position: 'relative' }}
		>
			<div className="flex-col task" ref={ownRef}>
				<div className="flex-row-between">
					<p>{item.title}</p>
					<p className="category">[{item.category}]</p>
				</div>
				<p className="content">{item.content}</p>
			</div>
		</Reorder.Item>
	);
}

export default Task;