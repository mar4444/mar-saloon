import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    // auto close after 3 seconds
    setTimeout(() => {
      setToast({ message: "", type });
    }, 3000);
  };

  const closeToast = () => {
    setToast({ message: "", type: toast.type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);