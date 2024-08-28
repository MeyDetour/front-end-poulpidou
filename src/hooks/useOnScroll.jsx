import React from 'react';

const useOnScroll = (handleScroll) => {
	const listenToScroll = React.useCallback(
        (e) => requestAnimationFrame(() => handleScroll(e)),
        [handleScroll]
    );
    
	React.useEffect(() => {
		document.addEventListener('wheel', listenToScroll);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener('wheel', listenToScroll);
		};
	}, []);
}

export default useOnScroll;