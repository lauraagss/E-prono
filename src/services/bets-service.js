import axios from "axios";
import { updateUserStorage } from "./auth-service";
import {getBaseUrl} from "./conf";

async function betMatch(body) {
    return axios.post(`${getBaseUrl()}bets`, body)
        .then(response => response.data)
}

async function patchUser(userId, body) {
    return axios.patch(`${getBaseUrl()}users/${userId}`, body)
        .then(response => {
            updateUserStorage(response.data);
            return response.data;
        })
}

async function patchBet(betId, body) {
    return axios.patch(`${getBaseUrl()}bets/${betId}`, body)
        .then(response => response.data)
}

async function getMyBets() {
    return axios.get(`${getBaseUrl()}bets`)
        .then(response => response.data)
}

export {
    betMatch,
    patchUser,
    getMyBets,
    patchBet
}