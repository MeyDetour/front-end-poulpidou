import Axios from 'axios';

const getChart = (type, time) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${process.env.REACT_APP_API_ADRESS}/api/statistic`,
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
                params: { // Envoie les données en tant que paramètres pour une requête GET
                    type: type,
                    time: time
                }
            })
            .then((res) => {
                return resolve({state: "OK", value: res.data.value});
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
            })
    });
}

export {getChart};