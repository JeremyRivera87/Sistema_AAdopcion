import React from "react";
import "../styles/CustomAlert.css";

const CustomAlert = ({ isOpen, onClose, title, message, type = "info" }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch(type) {
      case "success": return "✓";
      case "error": return "✕";
      case "warning": return "⚠";
      case "info": return "ℹ";
      default: return "ℹ";
    }
  };

  const getIconClass = () => {
    switch(type) {
      case "success": return "icon-success";
      case "error": return "icon-error";
      case "warning": return "icon-warning";
      case "info": return "icon-info";
      default: return "icon-info";
    }
  };

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-container" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-icon ${getIconClass()}`}>
          {getIcon()}
        </div>
        <h2 className="alert-title">{title}</h2>
        <p className="alert-message">{message}</p>
        <button className="alert-button" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;