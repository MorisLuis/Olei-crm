// responseInterceptors.ts
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import Cookies from "js-cookie";
import { domain } from './api';
import toast from 'react-hot-toast';
import { triggerUnauthorized } from './apiCallbacks';

const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Interceptor para respuestas exitosas (sin modificación, pero se mantiene para consistencia)
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

// Interceptor de errores – centralizamos el manejo de distintos status y casos especiales
export const errorResponseInterceptor = async (error: AxiosError): Promise<never> => {

    // Extraemos la configuración original y el status de la respuesta si existe
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error.response?.status;
    const message = (error.response?.data as { error?: string })?.error;

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`🚨 [${status}] - ${message}`);
    };


    // Manejo global del timeout (y otros errores de conexión)
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        toast.error('Conexión lenta ⏳. Intenta de nuevo.');
        return Promise.reject(error);
    }

    // Caso 401: No autorizado → Cerramos sesión ( solo eliminando token's )
    if (status === HTTP_STATUS.UNAUTHORIZED) {
        triggerUnauthorized();
        return Promise.reject(error);
    }

    // Caso 403: Prohibido → Intentamos refrescar el token (si aún no se hizo)
    if (status === HTTP_STATUS.FORBIDDEN && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = Cookies.get("refreshToken");
            if (!refreshToken) {
                triggerUnauthorized();
                return Promise.reject(new Error('No hay refresh token'));
            }

            const { data } = await axios.post(`${domain}api/auth/refresh`, { refreshToken });
            await Cookies.set('token', data.token);
            await Cookies.set('refreshToken', data.refreshToken);

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

            return axios(originalRequest);
        } catch (refreshError) {
            triggerUnauthorized();
            return Promise.reject(refreshError);
        }
    };

    // Caso 500: Error interno del servidor
    if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        toast.error('Error del servidor 😓');
        return Promise.reject(error);
    }

    // Para todos los demás errores, simplemente retornamos el rechazo
    return Promise.reject(error);
};
