import {useState, useEffect} from "react";
import { getAllItemsService } from "@/service/itemService";
import { NavLink } from "react-router-dom";

const Home = () => {
  // estado para almacenar los items
  const [itemsList, setItemsList] = useState([]);
  // hacemos la llamada a la API para obtener los items
  // y los almacenamos en el estado
   useEffect(() => {
    // función para obtener todos los items/productos
    const fetchItemsData = async () => {
      try {
        const response = await getAllItemsService();
        // debug en consola 
        console.log("Respuesta en Home:" , response);
        setItemsList(response);
      }catch(error){
        console.log("Ocurrio un error al obtener los items:", error);
      }
    };
    fetchItemsData();
  }, [])


  return (
      <>
       <h1 className="flex justify-center mt-5 text-3xl font-bold text-gray-800 mb-4">Bienvenido al Home </h1>
      {/* debug visual
    <pre>{JSON.stringify(itemsList, null, 2)}</pre> */}
      <div className="flex flex-wrap justify-center gap-6 py-6">
        {/* Si itemsData no esta vacio, recorro el arreglo con Map y creo un Card para cada elemento */}
        {itemsList &&
          itemsList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden w-72 transition-transform hover:scale-105"
            >
              <img
                src={product.image || "https://via.placeholder.com/300?text=Sin+Imagen"}
                alt={product.product_name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300?text=Imagen+no+disponible";
                }}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800 mb-2">{product.product_name}</h5>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                {/* Aqui no se implementa el botón, pero basta con sustituir "a" por Link de react-router-dom y la ruta del enlace indicar el componente que mostrará la información de un solo producto, seguido del id del producto */}
                <NavLink
                to="#"
                  // to={`/item/${product.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Comprar
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home