import Axios from 'axios';

const putTask = (data, id) => {
	return new Promise((resolve, reject) => {
		Axios.put(`${process.env.REACT_APP_API_ADRESS}/api/task/${data.id}/edit`, 
		{
			name: data.title,
			content: data.content != undefined ? data.content : "",
			category: data.category != undefined ? data.category : "",
			project_id: id,
			dueDate: data.dueDate != undefined ? data.dueDate.split('-').reverse().join('/') : "",
			status: data.status != undefined ? data.status : "waiting", 
		}, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		})
		.then(res => {
			return resolve({state: "OK", value: res.data.value})
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

export { putTask };