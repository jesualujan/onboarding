// rutas privadas
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/hook/useAuthContext";

const ProtectedRoute = ({ children }) => {
  // consumimos el contexto
  const { isAuth } = useAuthContext(); // ¿estás autenticado?
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
