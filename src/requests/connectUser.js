import Axios from 'axios';

const connectUser = () => {
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/api/login_check`, {
			username: "meydetour@gmail.com",
			password: "o5xKRJO8ZgCaAgkI"
		}).then((res) => {
			sessionStorage.setItem("token", res.data.token)

			return resolve({state: "OK", value: res.data.token});
		});
	});
}

export { connectUser };