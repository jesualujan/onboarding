// userService es donde simularemos hacer la llamada a la API y para esto
// usamos axios, necesitamos pasarle un endpoint para que traiga los datos
// de la API

//* importar axios
import axiosInstance from "./axiosConfig";

// ocupo mandar información
// registrar un usuario (signup)
// usamos javascript -> asincronimos (async - await)
const registerUserService = async (data) => {
  const response = await axiosInstance.post("/register", data);
  return response; // retornamos toda la respuesta para manejar status
};

// autenticar un usuario (login)
const loginUserService = async (data) => {
  const response = await axiosInstance.post("/login", data);
  return response; // retornamos la respuesta para manejar status
};

export { registerUserService, loginUserService };
