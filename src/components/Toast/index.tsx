"use client";

import { useEffect, useState } from "react";
import { X, Eye, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "info":
        return <Info size={16} />;
      case "success":
        return <Eye size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getStyles = () => {
    const baseStyles =
      "fixed top-20 right-4 z-[9998] max-w-md p-4 rounded-lg shadow-lg border transition-all duration-300";

    if (!isVisible) return `${baseStyles} opacity-0 transform translate-x-full`;

    switch (type) {
      case "info":
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
      case "success":
        return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
      case "warning":
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case "error":
        return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
      default:
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
    }
  };

  return (
    <div className={getStyles()}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 flex-shrink-0 opacity-70 transition-opacity hover:opacity-100"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {
  return (
    <>
      {children}
      <div id="toast-container" />
    </>
  );
};

