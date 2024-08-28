import Axios from 'axios';

const getProject = (id) => {
	return new Promise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/project/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			},
			body: {
				display_deleted: false
			}
		})
		.then((res) => {
			resolve({state: "OK", value: res.data.value});
		})
		.catch(error => {
			if (error.response) {
				if (error.response.status === 404) {
					return reject({
						state: "error", 
						value: "The project couldn't be found."
					});
				}
			} 
			if (error.request) {
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

export { getProject };