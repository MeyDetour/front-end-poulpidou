import Axios from 'axios';

const getClients = () => {
	return new Pormise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/clients`, {
			headers: {
				displayDeleted: false,
				order_by: "name"
			}
		})
		.then(res => resolve({state: res.state, res.value}))
		.catch(res => {
			if (error.response) {
				// Verify 401
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

export { getClients };