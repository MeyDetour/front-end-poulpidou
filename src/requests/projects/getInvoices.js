import Axios from 'axios';

const getInvoices = (id) => {
	return new Promise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/${id}/invoices`, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		})
		.then(res => resolve({state: "OK", value: res.data}))
		.catch(error => {
			if (error.response) {
				if (error.response.status === 404) {
					return reject({
						state: "error", 
						value: "The invoices related to the project couldn't be found."
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

export { getInvoices };