import Axios from 'axios';

const postTask = (data, id) => {
	console.log()
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/api/task/new`, 
		{
			name: data.title,
			content: data.content != undefined ? data.content : "",
			category: data.category != undefined ? data.category : "",
			project_id: id,
			dueDate: data.dueDate.split('-').reverse().join('/') || null,
			status: data.status != undefined ? data.status : "waiting"
		}, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		})
		.then(res => {
			return resolve({state: "OK", value: res.data.value})
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
		});
	});
}

export { postTask };