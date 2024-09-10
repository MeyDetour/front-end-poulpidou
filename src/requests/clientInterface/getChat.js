import Axios from "axios";

const getChat = (uuid) => {
	return new Promise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/chat/${uuid}`)
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

export { getChat };