import React, { useState, useEffect, useCallback } from 'react'
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

const InputDropFile = () => {
	const { getValues, setValue } = useFormContext();

	const [areFilesUpploaded, setAreFilesUpploaded] = useState(false);
	const [fileName, setFileName] = useState(false);

	const onDrop = useCallback(acceptedFiles => {
		setAreFilesUpploaded(true);
		setFileName(acceptedFiles[0].name);
		setValue("file", acceptedFiles);

	}, []);

	useEffect(() => {
		if (getValues("file") === null) {
			setAreFilesUpploaded(null);
			setFileName(null);
		}
	}, [getValues("file")]);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

	return (
		<>
			<div 
				className="grid-center input-file"
				style={{border: areFilesUpploaded ? "2px var(--blue) dashed" : "2px var(--grey-light-4) dashed"}}
				{...getRootProps()}
			>
				<div>
					<img
						src="pictures/icons/filetype-pdf.svg"
						style={{
							margin: '20px auto',
							display: 'block',
							width: "100px"
						}}
					/>
					{
						isDragActive && !areFilesUpploaded ?
						<p>Drop the files here ...</p> 
						: !areFilesUpploaded 
						? <p>Drag 'n' drop some files here, or click to select files.</p>
						: null
					}
					{
						areFilesUpploaded ? 
						<p style={{color: "var(--blue)", fontWeight: "bold"}}>File named '{fileName}' is upploaded</p>
						: null
					}
				</div>
			</div>
			<input type="hidden" id="input-file" accept=".pdf" {...getInputProps()}/>
		</>
	);
}

export default InputDropFile;