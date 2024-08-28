import React, { useEffect, useRef } from 'react';
import { Reorder, useMotionValue } from 'framer-motion';

const Task = ({ item, container, setValues, setDisplayWidget, list, setDraggedTask, isDragging, setIsDragging }) => {
	const ownRef = useRef(null);

	const handleDrag = (e) => {
		if (ownRef.current === null) return;

		// console.log(item.id)

		ownRef.current.style.boxShadow = "0 5px 5px rgba(0,0,0,0.2)";
	}

	const handleDragEnd = (e) => {
		setIsDragging(false);
		if (ownRef.current === null) return;

		ownRef.current.style.boxShadow = "none";
	}

	return (
		<Reorder.Item 
			value={item}
			id={item.id}
			dragConstrains={container}
			onDrag={handleDrag}

			onDragStart={() => {
				setIsDragging(true);
				setDraggedTask(item.id);
			}}
     		onDragEnd={handleDragEnd}
     		onClick={() => {
     			if (!isDragging) {
	 				setValues({
						id: item.id,
						title: item.name,
						content: item.content,
						category: item.category,
						dueDate: item.dueDate,
						list: list
					});
					setDisplayWidget(true);
				}
			}}
			style={{ position: 'relative' }}
		>
			<div
				className="flex-col task"
				ref={ownRef}
			>
				<div className="flex-row-between">
					<p>{item.name}</p>
					<p className="category">{(item.category != undefined && item.category?.length > 0) && `[${item.category}]`}</p>
				</div>
				<p className="content">{item.content}</p>
			</div>
		</Reorder.Item>
	);
}

export default Task;