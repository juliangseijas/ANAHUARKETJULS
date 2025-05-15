import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LogIn";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import ProductoAjeno from "./pages/ProductoAjeno";
import ProductoPropio from "./pages/ProductoPropio";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
