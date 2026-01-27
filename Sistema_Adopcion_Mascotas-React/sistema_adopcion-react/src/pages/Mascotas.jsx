import React from "react";
import "../styles/Mascotas.css";


const mascotas = [
  {
    id: 1,
    nombre: "Luna",
    edad: "2 años",
    sexo: "Hembra",
    tamanio: "Mediano",
    descripcion: "Cariñosa, juguetona y muy sociable con niños.",
    imagen: "https://images.unsplash.com/photo-1558788353-f76d92427f16"
  },
  {
    id: 2,
    nombre: "Max",
    edad: "3 años",
    sexo: "Macho",
    tamanio: "Grande",
    descripcion: "Protector, leal y entrenado.",
    imagen: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
  },
  {
    id: 3,
    nombre: "Mía",
    edad: "1 año",
    sexo: "Hembra",
    tamanio: "Pequeño",
    descripcion: "Tranquila, ideal para departamentos.",
    imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
  }
];

const Mascotas = () => {
  return (
    <section className="mascotas-section">
      <h2 className="mascotas-title">Mascotas Disponibles</h2>
      <div className="mascotas-line"></div>

      <div className="mascotas-grid">
        {mascotas.map((mascota) => (
          <div className="mascota-card" key={mascota.id}>
            <img src={mascota.imagen} alt={mascota.nombre} />

            <div className="mascota-overlay">
              <h3>{mascota.nombre}</h3>
              <p><strong>Edad:</strong> {mascota.edad}</p>
              <p><strong>Sexo:</strong> {mascota.sexo}</p>
              <p><strong>Tamaño:</strong> {mascota.tamanio}</p>
              <p className="descripcion">{mascota.descripcion}</p>

              <button className="btn-adoptar">Adoptar</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mascotas;
