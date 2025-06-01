import React, {useState, useEffect} from 'react';
import {CheckCircle, XCircle, AlertCircle, Info, X} from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600/20 border-green-600/30 text-green-300';
      case 'error':
        return 'bg-red-600/20 border-red-600/30 text-red-300';
      case 'warning':
        return 'bg-yellow-600/20 border-yellow-600/30 text-yellow-300';
      case 'info':
        return 'bg-blue-600/20 border-blue-600/30 text-blue-300';
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border backdrop-blur-sm ${getStyles()}`}
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }>;
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      message: string;
      type: 'success' | 'error' | 'warning' | 'info';
      duration?: number;
    }>
  >([]);

  const addToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration?: number,
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, {id, message, type, duration}]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message: string, duration?: number) =>
    addToast(message, 'success', duration);
  const showError = (message: string, duration?: number) =>
    addToast(message, 'error', duration);
  const showWarning = (message: string, duration?: number) =>
    addToast(message, 'warning', duration);
  const showInfo = (message: string, duration?: number) =>
    addToast(message, 'info', duration);

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
