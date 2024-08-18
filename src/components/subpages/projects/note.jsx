import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from "react-hook-form";

const Note = ({ color, index }) => {
	const { register } = useFormContext();
	return (
		<div className="flex-col bigNote" style={{backgroundColor: color, borderRadius: "10px"}} onClick={(e) => e.stopPropagation()} onDragEnd={(e) => e.stopPropagation()}>
			<input type="text" placeholder="No title" {...register(`note.${index}.title`)}/>
			<textarea placeholder="Write your notes right there!" {...register(`note.${index}.content`)}></textarea>
			<div className="flex-end">
				<input type="submit" value="Save changes"/>
			</div>
		</div>
	);
}

export default Note;
