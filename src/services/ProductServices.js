import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export function getThings(limit, page, token, thing) {
    const url = BASE_URL + "/api/product/" + thing + "/";
    const params = {
        limit: limit,
        page: page ? page : 1
    };
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    return axios.get(url, { params: params, headers: headers })
}

export function getProducts(arg) {
    let url = BASE_URL + "/api/product/item/";
    let params = {}

    if (arg.product) {
        url += arg.product;
    } else {
        params = {
            limit: arg.limit,
            page: arg.page ? arg.page : 1,
            structure: arg.structure
        };
    }

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${arg.token}`
    };

    return axios.get(url, { params: params, headers: headers })
}

export function getProductInventories(token, key) {
    const url = BASE_URL + "/api/product/inventory";
    const params = { key: key };
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    return axios.get(url, { params: params, headers: headers })
}