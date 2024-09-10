import Axios from 'axios';

const putClient = (data, id) => {
	console.log(data)
	return new Promise((resolve, reject) => {
		Axios.put(`${process.env.REACT_APP_API_ADRESS}/api/client/edit/${id}`, {
			firstName: data.firstName || null,
			lastName: data.lastName || null,
			job: data.job || "",
			age: data.age || "",
			location: data.location || "",
			mail: data.mail || "",
			siret: data.siret || "",
			phone: data.phone || ""
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

export { putClient };