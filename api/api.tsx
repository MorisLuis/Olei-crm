import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true, // Permite enviar cookies con cada solicitud
});

// 🛠️ Interceptor para agregar token a cada petición
api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚀 Interceptor para manejar errores en respuestas
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, la dejamos pasar
  async (error) => {
    console.error("Error en API:", error);

    // 📝 Enviar error a la base de datos

    const errorBody = {
      From: error.config?.url,
      Message: error.response?.data.error ? error.response?.data.error : error.response?.data,
      Metodo: error.config?.method,
      code: error.response?.status
    }

    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/errors`,
        errorBody
      );
    } catch (logError) {
      console.error("Error al registrar en la BD:", logError);
    }

    return Promise.reject(error);
  }
);
