import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export function cartServices(token, method, body=null) {
    const url = BASE_URL + "/api/transaction/cart/";
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    if (method === "get") {
        return axios.get(url, {headers: headers})
    } 
}

export function wishlistServices(token, method, body=null) {
    const url = BASE_URL + "/api/transaction/wishlist/";
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    if (method === "get") {
        return axios.get(url, {headers: headers})
    } 
}