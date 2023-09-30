import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export function authLogin(user) {
    const url = BASE_URL + "/api/user/generate-token/";
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    return axios.post(
        url, user,
        {
            ...config,
            withCredentials: true,
            timeout: 5000,
        }
    )
}

export function authRefreshToken(refresh_token) {
    const url = BASE_URL + "/api/user/refresh-token/";
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    return axios.post(
        url,
        {
            refresh: refresh_token
        },
        {
            ...config,
            withCredentials: true,
            timeout: 5000,
        }
    )
}


export function authLogout(refresh_token) {
    const url = BASE_URL + "/api/user/destroy-token/";
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }

    return axios.post(
        url,
        {
            refresh_token: refresh_token
        },
        {
            ...config,
            withCredentials: true,
            timeout: 5000,
        }
    )
}