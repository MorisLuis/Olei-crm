import axios from "axios";
import { requestInterceptor } from "./requestInterceptors";
import { errorResponseInterceptor, responseInterceptor } from "./responseInterceptor";

export const domain = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL: domain,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true, // Permite enviar cookies con cada solicitud
});

// 🛠️ Interceptor para agregar token a cada petición
api.interceptors.request.use(
  requestInterceptor, // Aquí aplicamos la función de interceptor de solicitud.
  (error) => Promise.reject(error)
);

// 🚀 Agregar interceptores de respuesta
api.interceptors.response.use(
  responseInterceptor,
  errorResponseInterceptor
);
