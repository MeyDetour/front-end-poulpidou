import Axios from 'axios';

import { logIn } from './logIn';

const logUp = (data) => {
	return new Promise((resolve, reject) => {
		Axios.post(`${process.env.REACT_APP_API_ADRESS}/register`, {
			username: data.pseudo,
			password: data.password
		})
		.then((res) => {
			logIn(data)
			.then(res => resolve({
				state: "OK", 
				value: "You succesfuly connected. We wish you a successful work session on Poulpidou."
			}))
			.catch(res => resolve({
				state: "warning", 
				value: "Your account was succesfuly created. However a problem happend while trying to connect you. Please try to connect manualy in the sign in page."
			}));
		})
		.catch((res) => 
			reject({state: "error", value: "An error occured while creating your account, please retry by reloading the page."})
		);
	});
}

export { logUp };