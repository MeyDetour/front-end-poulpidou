import Axios from 'axios';

const logIn = (data) => {
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/api/login_check`, {
			username: data.pseudo,
			password: data.password
		})
		.then((res) => {
			sessionStorage.setItem("token", res.data.token)

			return resolve({state: "OK", value: res.data.token});
		})
		.catch((res) => 
			reject({state: "error", value: "An error occured, please retry by reloading the page."})
		);
	});
}

export { logIn };