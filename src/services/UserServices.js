import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export function userServices(arg) {
    const url = BASE_URL + "/api/user/detail/";
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${arg.token}`
    };

    if (arg.method === "get") {
        const params = {
            structure: arg.structure
        }
        return axios.get(url, { params: params, headers: headers })
    } 
    
}