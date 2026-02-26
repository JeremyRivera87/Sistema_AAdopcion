import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SeleccionarDonacion.css";

const SeleccionarDonacion = () => {
  const navigate = useNavigate();

  return (
    <div className="seleccion-donacion-container">
      <div className="seleccion-content">
        <h1>¿Cómo quieres ayudar? 💚</h1>
        <p className="subtitle">Elige el tipo de donación que deseas realizar</p>

        <div className="opciones-donacion">
          
          {/* Opción 1: Donación en Efectivo */}
          <div className="opcion-card" onClick={() => navigate("/donar")}>
            <div className="opcion-icon">💵</div>
            <h2>Donación en Efectivo</h2>
            <p>Ayúdanos con una donación monetaria para cubrir gastos del refugio</p>
            <ul className="beneficios">
              <li>✓ Pago de servicios básicos</li>
              <li>✓ Atención veterinaria</li>
              <li>✓ Mantenimiento de instalaciones</li>
              <li>✓ Salarios del personal</li>
            </ul>
            <button className="btn-seleccionar">Donar Efectivo</button>
          </div>

          {/* Opción 2: Donación en Especie */}
          <div className="opcion-card" onClick={() => navigate("/donar-especie")}>
            <div className="opcion-icon">🎁</div>
            <h2>Donación en Especie</h2>
            <p>Dona alimentos, medicinas o artículos que necesitamos</p>
            <ul className="beneficios">
              <li>✓ Alimento para mascotas</li>
              <li>✓ Medicinas y vacunas</li>
              <li>✓ Juguetes y accesorios</li>
              <li>✓ Productos de limpieza</li>
            </ul>
            <button className="btn-seleccionar">Donar Artículos</button>
          </div>

        </div>

        <button className="btn-volver" onClick={() => navigate("/donaciones")}>
          ← Volver a información
        </button>
      </div>
    </div>
  );
};

export default SeleccionarDonacion;