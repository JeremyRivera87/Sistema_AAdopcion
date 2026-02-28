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
          }, 800); // tiempo para el fade
          return 100;
        }
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`loader-wrapper ${progress === 100 ? "fade-out" : ""}`}>
      
      <div className="animation-scene">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="dog"
          className="dog-img"
        />
        <div className="dog-shadow"></div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/69/69524.png"
          alt="house"
          className="house-img"
        />
      </div>

      <h2 className="loading-text">Cargando Animal Home...</h2>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

    </div>
  );
};

export default Loader;