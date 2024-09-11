import Axios from 'axios';

const putProject = (data, id) => {
	console.log(data.project)
	const projectData = {
		totalPrice: data.project.totalPrice,
		estimatedPrice: data.project.estimatedPrice,
		maintenancePercentage: data.project.composition.maintenanceRange,
		identity: {
			name: data.project.identity.name,
			note: data.project.note,
			figmaLink: data.project.identity.figmaLink,
			githubLink: data.project.identity.githubLink,
			websiteLink: data.project.identity.websiteLink,
			startDate: data.project.identity.startDate ? data.project.identity.startDate.split('-').reverse().join('/') : null,
			endDate: data.project.identity.endDate ? data.project.identity.endDate.split('-').reverse().join('/') : null,
		},
		composition: {
			isPaying: String(data.project.composition.isPaying),
			database: String(data.project.composition.database),
			maquette: String(data.project.composition.maquette),
			maintenance: String(data.project.composition.maintenance),
			type: data.project.composition.type,
			framework: data.project.composition.framework,
			options: data.project.composition.options,
			devices: data.project.composition.devices
		}
	};

// Fonction pour supprimer les clés ayant des valeurs nulles
	const removeNullValues = (obj) => {
		Object.keys(obj).forEach(key => {
			if (obj[key] === null || obj[key] === "null") {
				delete obj[key]; // Supprime la clé si la valeur est null
			} else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				// Appelle récursivement pour les objets imbriqués
				removeNullValues(obj[key]);
			}
		});
	};

// Applique la fonction pour enlever les clés nulles
	removeNullValues(projectData);

	console.log(projectData); // Ce sera l'objet sans les valeurs nulles

	return new Promise((resolve, reject) => {
		Axios.put(`${process.env.REACT_APP_API_ADRESS}/api/project/edit/${id}`, 
		projectData, {
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

export { putProject };