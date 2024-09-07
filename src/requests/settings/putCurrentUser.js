import Axios from 'axios';

const putCurrentUser = (data) => {
	return new Promise((resolve, reject) => {
		Axios.put(`${process.env.REACT_APP_API_ADRESS}/api/edit/me`, {
			phone:data.phone,
			siret:data.siret,
			address:data.address,
			firstName:data.firstName,
			lastName:data.lastName
		},{
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		}
		)
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

export { putCurrentUser };