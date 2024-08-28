import Axios from 'axios';

const getChats = () => {
	return new Promise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/chats`, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		})
		.then((res) => {
			return resolve({state: "OK", value: res.data.value});
		})
		.catch(error => {
			if (error.response) {
				
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
		})
	});
}

export { getChats };