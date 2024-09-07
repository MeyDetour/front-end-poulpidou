import Axios from "axios";

const getChat = (id) => {
	return new Promise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/chat/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			},

		})
		.then((res) => {
			resolve({state: "OK", value: res.data.value});
		})

		.catch(error => {
			if (error.response) {
				if (error.response.status === 404) {
					return reject({
						state: "error",
						value: "The chat couldn't be found."
					});
				}
				if (error.response.status === 401) {
					sessionStorage.removeItem("token");
					return reject({
						state: "error", 
						value: "Your account just expired, please log in to continue your work."
					})
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

export { getChat };