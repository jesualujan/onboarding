// creamos un axiosConfig para podernos comunicar con nuestro
// servidor backend, Json-server-jwt (contiene los datos en db.json)
//* 1) importar axios
import axios from "axios";

console.log("baseURL", import.meta.env.VITE_API_BASE_URL);

//* 2) crear nuestra instancia de axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response, // si la respuesta es exitosa, la dejamos pasar
  (error) => {
    const status = error.response?.status;
    const url = error.confing?.url;
    const method = error.config?.method?.toUpperCase();
    const backendMessage = error.response?.data?.message;

    let customMessage = ` Error en ${method} ${url} - `;

    if (status) {
      customMessage += `Código ${status}`;
    }

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
    console.error(customMessage); // para ver en consola con claridad
    return Promise.reject(new Error(customMessage));
  }
);

export default axiosInstance;
