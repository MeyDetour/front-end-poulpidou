import Axios from 'axios';

const getAllProjects = () => {
	return new Promise((resolve, reject) => {
		Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/your/projects`, {
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("token")
			},
			body: {
				display_deleted: false
			}
		}).then((res) => {
			return resolve({state: "OK", value: res.data.value});
		});
	});
}

export { getAllProjects };