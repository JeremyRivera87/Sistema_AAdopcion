import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Usuarios from "./pages/Usuarios";
import QuienesSomos from './pages/QuienesSomos';
import MisionVision from './pages/MisionVision';
import Equipo from './pages/Equipo';
import HistoriasExito from './pages/HistoriasExito';
import Testimonios from './pages/Testimonios';

import Perfil from "./pages/Perfil";
import AdminAvisos from './pages/AdminAvisos';
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import InformacionMascotas from './pages/InformacionMascotas';
import Mascotas from "./pages/Mascotas";
import DetalleMascota from './pages/DetalleMascota';
import AdminHistorialMedico from './pages/AdminHistorialMedico';
import FormularioAdopcion from './pages/FormularioAdopcion';
import DetalleSolicitud from './pages/DetalleSolicitud';
import AdminSolicitudes from './pages/AdminSolicitudes';
import AdminMascotas from "./pages/AdminMascotas";
import InformacionCitas from './pages/InformacionCitas';
import AgendarCitas from './pages/AgendarCitas';
import Voluntariado from './pages/Voluntariado';
import AdminVoluntariado from './pages/AdminVoluntariado';
import MisCitas from './pages/MisCitas';
import InformacionDonaciones from './pages/InformacionDonaciones';
import AdminCitas from './pages/AdminCitas';
import SeleccionarDonacion from './pages/SeleccionarDonacion';
import Donar from './pages/Donar';
import DonarEspecie from './pages/DonarEspecie';
import AdminDonaciones from './pages/AdminDonaciones';


function App() {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/mision-vision" element={<MisionVision />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/historias-exito" element={<HistoriasExito />} />
        <Route path="/testimonios" element={<Testimonios />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/admin/avisos" element={<AdminAvisos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/info-mascotas" element={<InformacionMascotas />} />
        <Route path="/Mascotas" element={<Mascotas />} />
        <Route path="/admin/historial/:mascota_id" element={<AdminHistorialMedico />} />
        <Route path="/mascota/:id" element={<DetalleMascota />} />
        <Route path="/adoptar/:id" element={<FormularioAdopcion />} />
        <Route path="/admin/solicitudes" element={<AdminSolicitudes />} />
        <Route path="/admin/mascotas" element={<AdminMascotas />} />
        <Route path="/admin/donaciones" element={<AdminDonaciones />} />
        <Route path="/info-citas" element={<InformacionCitas />} />
        <Route path="/agendar-cita" element={<AgendarCitas />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/admin/citas" element={<AdminCitas />} />
        <Route path="/donar" element={<Donar />} />
        <Route path="/donaciones" element={<InformacionDonaciones />} />
        <Route path="/voluntariado" element={<Voluntariado />} />
        <Route path="/admin/voluntariado" element={<AdminVoluntariado />} />
        <Route path="/donar-especie" element={<DonarEspecie />} />
        <Route path="/seleccionar-donacion" element={<SeleccionarDonacion />} />
        <Route path="/admin/donaciones" element={<AdminDonaciones />} />
        <Route path="/admin/solicitud/:id" element={<DetalleSolicitud />} />

      </Routes>
    </Router>
  );
}

export default App;