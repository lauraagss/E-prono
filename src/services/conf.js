function getBaseUrl() {
    return process.env.REACT_APP_DB
}

function getApiUrl() {
    return process.env.REACT_APP_API_PANDA
}

export {
    getBaseUrl,
    getApiUrl
}