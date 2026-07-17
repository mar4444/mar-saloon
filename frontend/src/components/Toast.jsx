import React from "react";

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 w-75 p-4 rounded-lg shadow-lg text-white flex justify-between items-center transform transition-all duration-500 ease-out
        animate-slideIn
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      <p className="text-sm font-medium">{message}</p>

      <button
        onClick={onClose}
        className="ml-4 font-bold text-lg hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;