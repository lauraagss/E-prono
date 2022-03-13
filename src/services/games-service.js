import axios from "axios";
import {getApiUrl} from "./conf";

async function getAllGames() {
    return axios.get(`${getApiUrl()}videogames`)
        .then(response => response.data)
}

export {
    getAllGames
}