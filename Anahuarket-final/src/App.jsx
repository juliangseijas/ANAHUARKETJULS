import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./assets/styles/index.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

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

function AppLayout() {
  const location = useLocation();
  const hideHeader = location.pathname === "/" || location.pathname === "/registro";

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/producto/:id" element={<ProductoAjeno />} />
        <Route path="/producto-propio/:id" element={<ProductoPropio />} />
        <Route path="/resultados" element={<ResultadosBusqueda />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/agregar-producto" element={<AgregarProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/categoria/:idCategoria" element={<Categoria />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
