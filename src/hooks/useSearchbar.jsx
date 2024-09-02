const useSearchbar = () => {
	const research = (dicts, keys, keywords, flags = "") => {
		const res = [];

		// Delete all doubles in keywords
		const keywordsList = [...new Set(keywords.split(' '))];

		dicts.forEach(dict => {

			const isValueAccepted = keys.some(key => {
				const deepKeys = key.split('.');
				const regex = new RegExp(keywordsList.join('|'), flags);

				let cell = dict;
				let keysStr = "";

				try {
					deepKeys.forEach(deepKey => {
						cell = cell[deepKey];
						keysStr += deepKey + "."
					});

					return cell?.search(regex) !== -1
				} catch(e) {
					console.log(`The keys path you gave for the searchbar is uncorrect: ${keysStr.slice(0, -1)}.`);
				}
			});

			if (isValueAccepted) res.push(dict);
		});

		return res;
	}

	return research;
}

export { useSearchbar };