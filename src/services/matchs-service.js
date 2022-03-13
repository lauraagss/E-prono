import axios from "axios";
import {getApiUrl} from "./conf";

async function getAllMatchByGames(slug, filter){
    const filterUrl = filter ? "/" + filter : ""
    return axios.get(`${getApiUrl()}${slug}/matches${filterUrl}`)
        .then(response => response.data)
}

async function getMatch(id){
    return axios.get(`${getApiUrl()}/matches/${id}`)
        .then(response => response.data)
}

export {
    getAllMatchByGames,
    getMatch
}