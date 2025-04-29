// requestInterceptors.ts
import Cookies from "js-cookie";
import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {

    const { method, url } = config;
    const token = Cookies.get("token");

    if (process.env.NODE_ENV === 'development') {
        console.log("[📡 API REQUEST]", method?.toUpperCase(), url);
    }

    // Asegurarse que headers existe
    config.headers = config.headers || {};

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};
