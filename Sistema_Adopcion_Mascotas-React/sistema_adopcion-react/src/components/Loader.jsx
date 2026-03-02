import React, { useEffect, useState } from "react";
import "../styles/Loader.css";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish();
          }, 500);
          return 100;
        }
        return prev + 1; // ← Aumenta de 1 en 1
      });
    }, 80); // ← Cada 60ms = 6 segundos total

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`loader-wrapper ${progress === 100 ? "fade-out" : ""}`}>
      
      <div className="animation-scene">
        {/* Perro corriendo */}
        <div className="dog-emoji">🐕</div>
        
        {/* Sombra del perro */}
        <div className="dog-shadow"></div>
        
        {/* Huellitas que aparecen */}
        <div className="paw-prints">
          <span className="paw paw-1">🐾</span>
          <span className="paw paw-2">🐾</span>
          <span className="paw paw-3">🐾</span>
          <span className="paw paw-4">🐾</span>
          <span className="paw paw-5">🐾</span>
        </div>
        
        {/* Casa */}
        <div className="house-emoji">🏡</div>
        
        {/* Nubes decorativas */}
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>
        
        {/* Sol */}
        <div className="sun">☀️</div>
        
        {/* Césped */}
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