import React, { useEffect, useState, createRef } from 'react';

const useKeyBindings = (defaultValue, keysList, sticky = false) => {
	const [key, setKey] = useState(defaultValue);

	const resetKey = () => setKey(defaultValue);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.ctrlKey || e.metaKey) {
				if (e.key === "Control" || e.key === "Alt" || e.key === "Meta" || e.key === "Shift") return;
				if (key === null && keysList.indexOf(e.key) !== -1) {
					e.preventDefault();
					setKey(e.key);
				}
			}
		};

		const handleKeyUp = (e) => {
			setKey(defaultValue)
		}

		document.addEventListener("keydown", handleKeyDown, true);
		if (!sticky) document.addEventListener("keyup", handleKeyUp, true);

		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
			if (!sticky) document.removeEventListener("keyup", handleKeyUp, true);
		};
	}, []);

	return sticky ? [key, resetKey] : key;
}

export default useKeyBindings;