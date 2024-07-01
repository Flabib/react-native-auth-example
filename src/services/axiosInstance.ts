import { API_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const accessToken = SecureStore.getItem("accessToken");

        config.headers.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : null;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;