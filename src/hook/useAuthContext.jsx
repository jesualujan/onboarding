//* Paso 3) Consumidor del contexto de autenticación
// Importamos el hook useContext de React
import { useContext } from "react";
// Importamos el contexto que hemos creado previamente
import { AuthContext } from "@/context/AuthContext";

//* Creamos un hook personalizado para acceder al contexto de autenticación
export const useAuthContext = () => {
  // Usamos useContext para obtener el valor actual del AuthContext
  const context = useContext(AuthContext);

  // Validamos que el hook se esté utilizando dentro del AuthProvider
  // Esto previene errores si se intenta acceder al contexto fuera del proveedor
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  // Retornamos el contexto para que el componente consumidor pueda usarlo
  return context;
};
