import Header from "@/components/Header";
import RoutesIndex from "@/routes/RoutesIndex";
import { ToastContainer } from "react-toastify"; // importar el contenedor de notificaciones
import "react-toastify/dist/ReactToastify.css"; // importar el estilo de las notificaciones de toastify

function App() {
  return (
    <>
      {/* EL <ToastContainer /> es el que mostrará las notificaciones en toda mi aplicación, tienes react-toastify configurado globalmente */}
      <ToastContainer />
      <Header />
      <RoutesIndex />
    </>
  );
}

export default App;
