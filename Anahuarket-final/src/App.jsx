import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/index.css";
import Login from "./pages/LogIn";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import ProductoAjeno from "./pages/ProductoAjeno";
import ProductoPropio from "./pages/ProductoPropio";
import ResultadosBusqueda from "./pages/ResultadosBusqueda";
import EditarPerfil from "./pages/EditarPerfil";
import AgregarProducto from "./pages/AgregarProducto";
import EditarProducto from "./pages/EditarProducto";
import Categoria from "./pages/categoria";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/producto/:id" element={<ProductoAjeno />} />
        <Route path="/productoPropio" element={<ProductoPropio/>}/>
        <Route path="/producto-propio/:id" element={<ProductoPropio />} />
        <Route path="/resultados" element={<ResultadosBusqueda />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/agregar-producto" element={<AgregarProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/categoria/:idCategoria" element={<Categoria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
