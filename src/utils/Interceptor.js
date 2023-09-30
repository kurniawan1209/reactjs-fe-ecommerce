import axios from "axios";
import { authRefreshToken } from "../services/AuthServices";

let refresh = false;

axios.interceptors.response.use(
    resp => resp,
    async error => {

        if (error.response === 401 && !refresh) {
            refresh = true
            const refreshToken = localStorage.getItem('refresh_token')
            const response = await authRefreshToken(refreshToken);

            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                return axios(error.config);
            }
        }

        refresh = false;
        return error;
    }
);