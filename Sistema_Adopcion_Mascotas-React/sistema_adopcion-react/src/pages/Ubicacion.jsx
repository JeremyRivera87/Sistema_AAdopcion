import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Ubicacion.css";

const Ubicacion = () => {
  const navigate = useNavigate();
  const [transporteActivo, setTransporteActivo] = useState("auto");

  // Información de ubicación
  const infoUbicacion = {
    nombre: "Animal Home - Refugio de Animales",
    direccion: "Av. 10 de Agosto N34-451 y Vicente Ramón Roca",
    ciudad: "Quito, Pichincha",
    pais: "Ecuador",
    codigoPostal: "170143",
    telefono: "+593 99 123 4567",
    email: "contacto@animalhome.org",
    coordenadas: {
      lat: -0.1807,
      lng: -78.4678
    }
  };

  // Horarios de atención
  const horarios = [
    { dia: "Lunes a Viernes", horario: "9:00 AM - 6:00 PM", disponible: true },
    { dia: "Sábados", horario: "10:00 AM - 4:00 PM", disponible: true },
    { dia: "Domingos y Feriados", horario: "Cerrado", disponible: false }
  ];

  // Cómo llegar
  const transportes = [
    {
      id: "auto",
      nombre: "En Auto",
      icono: "🚗",
      instrucciones: [
        "Desde el Norte de Quito: Toma la Av. 10 de Agosto dirección sur hasta la intersección con Vicente Ramón Roca.",
        "Desde el Sur: Sube por la Av. 10 de Agosto dirección norte.",
        "Estacionamiento gratuito disponible en nuestras instalaciones.",
        "Tiempo aproximado desde el centro: 20-25 minutos dependiendo del tráfico."
      ]
    },
    {
      id: "bus",
      nombre: "En Bus",
      icono: "🚌",
      instrucciones: [
        "Líneas de bus que pasan por la zona: Ecovía, Corredor Central Norte.",
        "Parada más cercana: 'La Gasca' (Ecovía) - 5 minutos caminando.",
        "Desde la parada La Gasca, camina 3 cuadras hacia el este por Vicente Ramón Roca.",
        "Tarifa: $0.25 (Ecovía), $0.35 (buses urbanos)."
      ]
    },
    {
      id: "metro",
      nombre: "En Metro",
      icono: "🚇",
      instrucciones: [
        "Estación más cercana: 'La Carolina' (Línea 1 del Metro de Quito).",
        "Desde la estación, toma un bus de conexión o taxi (10 minutos).",
        "También puedes caminar aproximadamente 20 minutos desde la estación.",
        "El metro opera de 6:00 AM a 9:00 PM de lunes a sábado."
      ]
    },
    {
      id: "taxi",
      nombre: "En Taxi / Uber",
      icono: "🚕",
      instrucciones: [
        "Servicios disponibles: Taxi convencional, Uber, Cabify, InDriver.",
        "Dile al conductor: 'Animal Home, Av. 10 de Agosto y Vicente Ramón Roca'.",
        "Costo aproximado desde el centro histórico: $5-8 USD.",
        "Costo desde el aeropuerto: $25-30 USD (45 minutos aprox)."
      ]
    }
  ];

  // Puntos de referencia
  const puntosReferencia = [
    {
      nombre: "Parque La Carolina",
      distancia: "1.2 km",
      direccion: "5 minutos en auto",
      icono: "🌳"
    },
    {
      nombre: "Centro Comercial Quicentro Shopping",
      distancia: "800 m",
      direccion: "10 minutos caminando",
      icono: "🏬"
    },
    {
      nombre: "Hospital Metropolitano",
      distancia: "2.5 km",
      direccion: "8 minutos en auto",
      icono: "🏥"
    },
    {
      nombre: "Universidad San Francisco de Quito",
      distancia: "3 km",
      direccion: "10 minutos en auto",
      icono: "🎓"
    }
  ];

  // Servicios cercanos
  const serviciosCercanos = [
    {
      categoria: "Veterinarias",
      servicios: [
        { nombre: "Clínica Veterinaria La Carolina", distancia: "1.5 km" },
        { nombre: "Hospital Veterinario 24H", distancia: "2 km" }
      ],
      icono: "🏥"
    },
    {
      categoria: "Pet Shops",
      servicios: [
        { nombre: "Petz & Co", distancia: "800 m" },
        { nombre: "Mascotas Premium", distancia: "1.2 km" }
      ],
      icono: "🛒"
    },
    {
      categoria: "Parques",
      servicios: [
        { nombre: "Parque La Carolina", distancia: "1.2 km" },
        { nombre: "Parque El Ejido", distancia: "3 km" }
      ],
      icono: "🌲"
    }
  ];

  const abrirMapa = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${infoUbicacion.coordenadas.lat},${infoUbicacion.coordenadas.lng}`;
    window.open(url, '_blank');
  };

  const abrirWaze = () => {
    const url = `https://waze.com/ul?ll=${infoUbicacion.coordenadas.lat},${infoUbicacion.coordenadas.lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  return (
    <div className="ubicacion-page">
      <Navbar />
      
      <main className="ubicacion-container">
        
        {/* Hero Section */}
        <section className="hero-ubicacion">
          <div className="hero-ubicacion-content">
            <h1>Nuestra Ubicación</h1>
            <p className="hero-ubicacion-subtitle">
              Encuéntranos en el corazón de Quito. Te esperamos con los brazos abiertos.
            </p>
          </div>
        </section>

        {/* Mapa y Dirección */}
        <section className="mapa-direccion">
          <div className="mapa-direccion-container">
            
            {/* Mapa Simulado */}
            <div className="mapa-placeholder">
              <div className="mapa-contenido">
                <div className="mapa-marker">📍</div>
                <h3>{infoUbicacion.nombre}</h3>
                <p>{infoUbicacion.direccion}</p>
                <p>{infoUbicacion.ciudad}, {infoUbicacion.pais}</p>
                
                <div className="mapa-botones">
                  <button className="btn-mapa" onClick={abrirMapa}>
                    🗺️ Abrir en Google Maps
                  </button>
                  <button className="btn-mapa secondary" onClick={abrirWaze}>
                    🚗 Abrir en Waze
                  </button>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="info-direccion">
              <h2>Información de Contacto</h2>
              
              <div className="info-item">
                <div className="info-icono">📍</div>
                <div className="info-texto">
                  <h4>Dirección</h4>
                  <p>{infoUbicacion.direccion}</p>
                  <p>{infoUbicacion.ciudad}, {infoUbicacion.pais}</p>
                  <p>Código Postal: {infoUbicacion.codigoPostal}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icono">📞</div>
                <div className="info-texto">
                  <h4>Teléfono</h4>
                  <p>{infoUbicacion.telefono}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icono">✉️</div>
                <div className="info-texto">
                  <h4>Email</h4>
                  <p>{infoUbicacion.email}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icono">🌐</div>
                <div className="info-texto">
                  <h4>Coordenadas</h4>
                  <p>Lat: {infoUbicacion.coordenadas.lat}</p>
                  <p>Lng: {infoUbicacion.coordenadas.lng}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horarios de Atención */}
        <section className="horarios-atencion">
          <div className="horarios-container">
            <h2>Horarios de Atención</h2>
            <p className="horarios-subtitle">Nuestro refugio está abierto en los siguientes horarios:</p>

            <div className="horarios-grid">
              {horarios.map((horario, index) => (
                <div key={index} className={`horario-card ${!horario.disponible ? 'cerrado' : ''}`}>
                  <div className="horario-dia">{horario.dia}</div>
                  <div className="horario-hora">{horario.horario}</div>
                  {horario.disponible && <div className="horario-badge">✓ Abierto</div>}
                  {!horario.disponible && <div className="horario-badge cerrado-badge">✕ Cerrado</div>}
                </div>
              ))}
            </div>

            <div className="horarios-nota">
              <p><strong>Nota importante:</strong> Recomendamos agendar una cita antes de visitarnos para garantizar que podamos atenderte de la mejor manera. Los fines de semana suelen tener mayor afluencia de visitantes.</p>
              <button className="btn-agendar" onClick={() => navigate("/info-citas")}>
                📅 Agendar una Cita
              </button>
            </div>
          </div>
        </section>

        {/* Cómo Llegar */}
        <section className="como-llegar">
          <div className="como-llegar-container">
            <h2>¿Cómo Llegar?</h2>
            <p className="como-llegar-subtitle">Elige tu medio de transporte preferido:</p>

            {/* Tabs de Transporte */}
            <div className="transporte-tabs">
              {transportes.map((transporte) => (
                <button
                  key={transporte.id}
                  className={`transporte-tab ${transporteActivo === transporte.id ? 'active' : ''}`}
                  onClick={() => setTransporteActivo(transporte.id)}
                >
                  <span className="tab-icono">{transporte.icono}</span>
                  <span className="tab-nombre">{transporte.nombre}</span>
                </button>
              ))}
            </div>

            {/* Contenido de Transporte */}
            <div className="transporte-contenido">
              {transportes.map((transporte) => (
                transporteActivo === transporte.id && (
                  <div key={transporte.id} className="transporte-info">
                    <h3>
                      <span className="transporte-info-icono">{transporte.icono}</span>
                      {transporte.nombre}
                    </h3>
                    <ul className="instrucciones-lista">
                      {transporte.instrucciones.map((instruccion, index) => (
                        <li key={index}>{instruccion}</li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>

        {/* Puntos de Referencia */}
        <section className="puntos-referencia">
          <div className="puntos-referencia-container">
            <h2>Puntos de Referencia Cercanos</h2>
            <p className="puntos-subtitle">Lugares conocidos cerca de nuestro refugio:</p>

            <div className="puntos-grid">
              {puntosReferencia.map((punto, index) => (
                <div key={index} className="punto-card">
                  <div className="punto-icono">{punto.icono}</div>
                  <h3>{punto.nombre}</h3>
                  <div className="punto-info">
                    <span className="punto-distancia">📏 {punto.distancia}</span>
                    <span className="punto-direccion">🕐 {punto.direccion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios Cercanos */}
        <section className="servicios-cercanos">
          <div className="servicios-cercanos-container">
            <h2>Servicios Útiles en la Zona</h2>
            <p className="servicios-subtitle">Lugares de interés para dueños de mascotas:</p>

            <div className="servicios-grid">
              {serviciosCercanos.map((categoria, index) => (
                <div key={index} className="servicio-categoria">
                  <div className="servicio-header">
                    <span className="servicio-icono">{categoria.icono}</span>
                    <h3>{categoria.categoria}</h3>
                  </div>
                  <ul className="servicio-lista">
                    {categoria.servicios.map((servicio, idx) => (
                      <li key={idx}>
                        <span className="servicio-nombre">{servicio.nombre}</span>
                        <span className="servicio-distancia">{servicio.distancia}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consejos para tu Visita */}
        <section className="consejos-visita">
          <div className="consejos-visita-container">
            <h2>Consejos para tu Visita</h2>
            
            <div className="consejos-grid">
              <div className="consejo-card">
                <div className="consejo-icono">📅</div>
                <h3>Agenda tu Visita</h3>
                <p>Contacta con anticipación para asegurar que podamos dedicarte el tiempo necesario.</p>
              </div>

              <div className="consejo-card">
                <div className="consejo-icono">👕</div>
                <h3>Ropa Cómoda</h3>
                <p>Usa ropa que no te importe ensuciar. ¡Nuestras mascotas son muy cariñosas!</p>
              </div>

              <div className="consejo-card">
                <div className="consejo-icono">🧴</div>
                <h3>Gel Antibacterial</h3>
                <p>Traemos disponible, pero también puedes traer el tuyo para mayor seguridad.</p>
              </div>

              <div className="consejo-card">
                <div className="consejo-icono">📸</div>
                <h3>Toma Fotos</h3>
                <p>¡Captura momentos especiales! Solo te pedimos no usar flash con los animales.</p>
              </div>

              <div className="consejo-card">
                <div className="consejo-icono">🎁</div>
                <h3>Donaciones</h3>
                <p>Si deseas, puedes traer alimento, juguetes o mantas para nuestras mascotas.</p>
              </div>

              <div className="consejo-card">
                <div className="consejo-icono">👨‍👩‍👧‍👦</div>
                <h3>Visita Familiar</h3>
                <p>Los niños son bienvenidos, pero deben estar supervisados por adultos en todo momento.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-ubicacion">
          <div className="cta-ubicacion-content">
            <h2>¿Listo para Visitarnos?</h2>
            <p>Estamos emocionados de conocerte. Ven y descubre cómo puedes cambiar una vida.</p>
            <div className="cta-ubicacion-buttons">
              <button className="cta-ubicacion-btn primary" onClick={() => navigate("/info-citas")}>
                📅 Agendar Cita
              </button>
              <button className="cta-ubicacion-btn secondary" onClick={() => navigate("/contacto")}>
                📧 Contactar Primero
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Ubicacion;