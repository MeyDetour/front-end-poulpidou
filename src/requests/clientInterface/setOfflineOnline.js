import Axios from 'axios';

const setOfflineOnline = (boolean, id) => {
	console.log(boolean,id)
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/interface/project/${id}/online`,
		{
			"online": boolean
		})
		.then(res => {
			return resolve({state: "OK", value: res.data.value})
		})
		.catch(error => {
			if (error.response.status === 401) {
				sessionStorage.removeItem("token");
				return reject({
					state: "error", 
					value: "Your account just expired, please log in to continue your work."
				})
			}
			if (error.request) { console.log(error.response.data)
				// No API response
				return reject({
					state: "error",
					value: "An error occured. Please try to reload the page."
				});
			} 
			// Une erreur est survenue lors de la configuration de la requête
			return reject({
				state: "error",
				value: "An error occured. Please try to reload the page."
			});
		});
	});
}

export { setOfflineOnline };