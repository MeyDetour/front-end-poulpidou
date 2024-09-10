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
		})
	});
}

export { getClients };