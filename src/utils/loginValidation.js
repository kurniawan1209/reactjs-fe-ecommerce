import jwt_decode from "jwt-decode";
import { authRefreshToken } from "../services/AuthServices";

export function LoginValidation() {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken == null) {
        return false;
    } else {
        try {
            const decodedToken = jwt_decode(accessToken);
            const expTokenDate = new Date(decodedToken.exp * 1000)
            const currDate = new Date();  

            if (expTokenDate < currDate) {
                try {
                    authRefreshToken(refreshToken)
                        .then(response => {
                            if (response.response.data.code === "token_not_valid"){
                                return false;
                            }
                        })
                        .catch(err => {
                            return false;
                        });
                } catch (error) {
                    return false;
                }
            } else {
                return true;
            }

        } catch (error) {
            return false;
        }
    }

}