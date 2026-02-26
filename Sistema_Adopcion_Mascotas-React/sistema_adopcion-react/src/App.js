import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Mascotas from "./pages/Mascotas";
import AdminMascotas from "./pages/AdminMascotas";
import AgendarCitas from './pages/AgendarCitas';
import MisCitas from './pages/MisCitas';
import InformacionDonaciones from './pages/InformacionDonaciones';
import AdminCitas from './pages/AdminCitas';
import SeleccionarDonacion from './pages/SeleccionarDonacion';
import Donar from './pages/Donar';
import DonarEspecie from './pages/DonarEspecie';
import AdminDonaciones from './pages/AdminDonaciones';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Mascotas" element={<Mascotas />} />
        <Route path="/admin/mascotas" element={<AdminMascotas />} />
        <Route path="/admin/donaciones" element={<AdminDonaciones />} />
        <Route path="/agendar-cita" element={<AgendarCitas />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/admin/citas" element={<AdminCitas />} />
        <Route path="/donar" element={<Donar />} />
        <Route path="/donaciones" element={<InformacionDonaciones />} />
        <Route path="/donar-especie" element={<DonarEspecie />} />
        <Route path="/seleccionar-donacion" element={<SeleccionarDonacion />} />
        <Route path="/admin/donaciones" element={<AdminDonaciones />} />

      </Routes>
    </Router>
  );
}

export default App;