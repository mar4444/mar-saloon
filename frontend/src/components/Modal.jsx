import React from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/30 p-4">

      <div
        className={`w-full ${sizes[size]} bg-white rounded-xl shadow-xl animate-in fade-in zoom-in-95`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;