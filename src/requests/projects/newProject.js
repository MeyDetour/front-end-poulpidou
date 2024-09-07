import Axios from 'axios';

const newProject = (data, id) => {
	console.log(data.project)
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/api/project/new`,
		{
			totalPrice: null,
			estimatedPrice: data.project.estimatedPrice || null,
			maintenancePercentage: parseInt(data.project.composition.maintenanceRange) || null,
			identity: {
				name: data.project.identity.name || null,
				note: data.project.note || null,
				figmaLink: data.project.identity.figmaLink || null,
				githubLink: data.project.identity.githubLink || null,
				websiteLink: data.project.identity.websiteLink || null,
				startDate: data.project.identity.startDate.split('-').reverse().join('/') || null,
				endDate: data.project.identity.startDate.split('-').reverse().join('/') || null,
				client_id: data.project.identity.client_id
			},
			composition: {
				isPaying: String(data.project.composition.isPaying) || null,
				database: String(data.project.composition.database) || null,
				maquette: String(data.project.composition.maquette) || null,
				maintenance: String(data.project.composition.maintenance) || null,
				type: data.project.composition.type || [],
				framework: data.project.composition.framework || [],
				options: data.project.composition.options || [],
				devices: data.project.composition.devices || []
			},
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

export { newProject };