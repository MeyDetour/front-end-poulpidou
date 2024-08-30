const useSearchbar = () => {
	const research = (dicts, keys, keywords, flags = "", exclusive = false) => {
		const res = [];

		// Delete all doubles in keywords
		const keywordsList = [...new Set(keywords.split(' '))];

		dicts.forEach(dict => {
			if (exclusive) {
				const isValueAccepted = keys.every(key => {
					const regex = new RegExp(keywordsList.join('|'), flags);
					return dict[key]?.search(regex) !== -1
				});
			}
			if (!exclusive) {
				const isValueAccepted = keys.some(key => {
					const regex = new RegExp(keywordsList.join('|'), flags);
					return dict[key]?.search(regex) !== -1
				});
			}

			if (isValueAccepted) res.push(dict);
		});

		return res;
	}

	return research;
}

export { useSearchbar };