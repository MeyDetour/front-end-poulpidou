import Axios from 'axios';

const newClient = (data) => {
	console.log(data)
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/api/client/new`, {
				mail: data.contact?.mail || null, // Utilisez une valeur par défaut si data.contact est undefined
				phone: data.contact?.phone || null,
				firstName: data.identity.firstName || null,
				lastName: data.identity.lastName || null,
				job: data.info?.job || null,
				info: data.info?.location || null,
				siret: data.info?.siret || null,
				note: data.note || null
			},
		{
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		})
		.then(res => {
			return resolve({state: "OK", value: "Client info were successfuly saved."})
		})
		.catch(error => {
			if (error.response) {
				console.log(error)
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

export { newClient };