// Importamos React y hooks necesarios
import { createContext, useState, useEffect } from "react";
// Importamos la función para decodificar tokens JWT
import { jwtDecode } from "jwt-decode";

//* 1) Crear el contexto de autenticación
// Este contexto permitirá compartir el estado de autenticación en toda la app
const AuthContext = createContext();

//* 2) Crear el proveedor del contexto
// Este componente envuelve la app y gestiona el estado global de autenticación
function AuthProvider({ children }) {
  // Estado que indica si el usuario está autenticado
  const [isAuth, setIsAuth] = useState(false);

  // Estado que guarda los datos decodificados del token JWT
  const [userPayload, setUserPayload] = useState(null);

  //* Función para iniciar sesión
  const login = (token) => {
    try {
      // Guardamos el token en localStorage
      localStorage.setItem("token", token);

      // Decodificamos el token para obtener el payload
      const decode = jwtDecode(token);

      //⏱ Verificamos si el token ha expirado
      if (decode.exp && decode.exp * 1000 < Date.now()) {
        console.log("El token ha expirado, Cerrando sesión");
        logout();
        return;
      }

      // Si el token es válido, actualizamos el estado
      setUserPayload(decode);
      setIsAuth(true);
    } catch (error) {
      console.log("Error al decodificar el token durante login:", error);
    }
  };

  //* Función para cerrar sesión
  const logout = () => {
    // Eliminamos el token del localStorage
    localStorage.removeItem("token");

    // Limpiamos el estado de usuario
    setUserPayload(null);
    setIsAuth(false);
  };

  //* Efecto que se ejecuta al montar el componente
  // Intenta recuperar sesión desde localStorage si hay un token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);

        //⏱ Verificamos si el token ha expirado
        if (decode.exp && decode.exp * 1000 < Date.now()) {
          console.log("El token ha expirado, Cerrando sesión");
          logout();
          return;
        }

        // Si el token es válido, restauramos el estado de sesión
        setUserPayload(decode);
        setIsAuth(true);
      } catch (error) {
        console.log("Error al decodificar el token desde localStorage:", error);
        logout(); // Si hay error, cerramos sesión por seguridad
      }
    }
  }, []);

  //* Datos que se compartirán a través del contexto
  const data = {
    isAuth, // ¿Está autenticado?
    userPayload, // Datos del usuario extraídos del token
    login, // Función para iniciar sesión
    logout, // Función para cerrar sesión
  };

  // Retornamos el proveedor con los datos disponibles para los hijos
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

// Exportamos el contexto y el proveedor para usarlos en otros módulos
export { AuthContext, AuthProvider };
