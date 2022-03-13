import axios from "axios";
import {getApiUrl} from "./conf";

async function getAllTeamsByGames(slug){
    return axios.get(`${getApiUrl()}${slug}/teams`)
        .then(response => response.data)
}

export {
    getAllTeamsByGames
}