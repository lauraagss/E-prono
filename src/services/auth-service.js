import axios from "axios";
import {getBaseUrl} from "./conf";

async function login({email, password}) {
    return axios.get(`${getBaseUrl()}users?email=${email}&password=${password}`)
        .then(response => {
            updateUserStorage(response.data[0]);
            return response.data;
        })
}

async function register(body) {
    return axios.post(`${getBaseUrl()}users`, body)
        .then(response => response.data)
}

function updateAxiosToken() {
    axios.interceptors.request.use((config) => {
        config.headers["Authorization"] = "Bearer " + process.env.REACT_APP_TOKEN_PANDA;
        return config
    })
}

function logout() {
    localStorage.removeItem("user")
}

function updateUserStorage(datas) {
    localStorage.setItem("user", JSON.stringify(datas))
}
function getUser() {

   let user =  localStorage.getItem("user")

    return user;
}

export {
    login,
    register,
    updateAxiosToken,
    logout,
    updateUserStorage,
    getUser
}