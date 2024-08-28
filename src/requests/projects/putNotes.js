import Axios from 'axios';

const putNotes = (data, id) => {
	return new Promise((resolve, reject) => {
		Axios.put(`${process.env.REACT_APP_API_ADRESS}/api/project/${id}/note`, 
		{
			names: [data.note[0].title, data.note[1].title, data.note[2].title, data.note[3].title, data.note[4].title],
			contents: [data.note[0].content, data.note[1].content, data.note[2].content, data.note[3].content, data.note[4].content]
		}, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			}
		})
		.then(res => {
			return resolve({state: "OK", value: "Notes were successfuly saved."})
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

export { putNotes };