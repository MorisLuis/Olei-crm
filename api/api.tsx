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
    try {
      /* await axios.post("/api/log-error", {
        error: {
          message: error.message,
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          response: error.response?.data,
        },
      }); */
    } catch (logError) {
      console.error("Error al registrar en la BD:", logError);
    }

    return Promise.reject(error);
  }
);
