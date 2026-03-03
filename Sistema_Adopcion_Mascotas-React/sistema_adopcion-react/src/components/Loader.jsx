import React, { useEffect, useState } from "react";
import "../styles/Loader.css";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false); // Nueva bandera para el cierre

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // Velocidad fluida

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // 1. Esperamos un momento para que el usuario vea el 100%
      const timerShow100 = setTimeout(() => {
        setIsDone(true); // Activamos el fade-out de CSS
      }, 400);

      // 2. Esperamos a que la animación de salida termine antes de llamar a onFinish
      const timerFinish = setTimeout(() => {
        onFinish();
      }, 1200);

      return () => {
        clearTimeout(timerShow100);
        clearTimeout(timerFinish);
      };
    }
  }, [progress, onFinish]);

  return (
    /* Usamos isDone para la clase de salida, así no se corta el progreso */
    <div className={`loader-wrapper ${isDone ? "fade-out" : ""}`}>
      
      <div className="animation-scene">
        <div className="dog-emoji">🐕</div>
        <div className="dog-shadow"></div>

        <div className="paw-prints">
          <span className="paw paw-1">🐾</span>
          <span className="paw paw-2">🐾</span>
          <span className="paw paw-3">🐾</span>
          <span className="paw paw-4">🐾</span>
          <span className="paw paw-5">🐾</span>
        </div>

        <div className="house-emoji">🏡</div>

        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>

        <div className="sun">☀️</div>
        <div className="grass"></div>
      </div>

      <div className="loading-content">
        <h2 className="loading-text">🐾 Cargando Animal Home...</h2>
        <p className="loading-subtitle">Preparando tu experiencia</p>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          <span className="progress-percentage">{progress}%</span>
        </div>
      </div>

    </div>
  );
};

export default Loader;