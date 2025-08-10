//* 1) Importamos la librería axios para hacer peticiones HTTP
import axios from "axios";

//* Mostramos en consola la URL base definida en el archivo .env
console.log("baseURL", import.meta.env.VITE_API_BASE_URL);

//* 2) Creamos una instancia personalizada de axios
const axiosInstance = axios.create({
  // Usamos la variable de entorno como base para todas las peticiones
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Indicamos que enviaremos datos en formato JSON
  },
});

//* 🔄 Interceptor de request — inserta el token si existe
// Antes de enviar cada petición, verificamos si hay un token en localStorage
// Si existe, lo agregamos al header Authorization como Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token usado en petición:", token); // Útil para debugging
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Retornamos la configuración modificada
  },
  (error) => {
    // En caso de error al preparar la petición, lo rechazamos
    return Promise.reject(error);
  }
);

//* 🛑 Interceptor de response — manejo de errores con mensajes custom
// Captura errores en las respuestas del servidor y genera mensajes personalizados
axiosInstance.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, la dejamos pasar tal cual
  (error) => {
    // Extraemos información relevante del error
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();
    const backendMessage = error.response?.data?.message;

    // Construimos un mensaje de error personalizado
    let customMessage = ` Error en ${method} ${url} - `;

    if (status) {
      customMessage += `Código ${status}`;
    }

    // Agregamos mensajes específicos según el código de estado
    if (backendMessage) {
      customMessage += backendMessage;
    } else if (status === 404) {
      customMessage +=
        "Recurso no encontrado (404). Verifica la ruta del endpoint.";
    } else if (status === 500) {
      customMessage += "Error interno del servidor (500)";
    } else if (status === 401) {
      customMessage += "No autorizado (401). Revisa las credenciales";
    } else if (status === 400) {
      customMessage +=
        "Solicitud mal formada (400). Verifica los datos enviados.";
    } else {
      customMessage += "Error desconocido";
    }

    // Mostramos el mensaje en consola para facilitar el debugging
    console.error(customMessage);

    // Rechazamos la promesa con el mensaje personalizado
    return Promise.reject(new Error(customMessage));
  }
);

//* Exportamos la instancia para usarla en otros módulos del proyecto
export default axiosInstance;
