import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      id,
      duration: 5000,
      ...toastData,
    };
    
    setToasts(prev => [...prev, toast]);

    // Auto remove toast after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => removeToast(toast.id), 300);
  };

  const getToastStyles = () => {
    const baseStyles = "relative flex items-start p-4 rounded-sm shadow-lg backdrop-blur-sm border transition-all duration-300 transform";
    
    const transformStyles = isExiting 
      ? "translate-x-full opacity-0 scale-95"
      : isVisible 
      ? "translate-x-0 opacity-100 scale-100"
      : "translate-x-full opacity-0 scale-95";

    const typeStyles = {
      success: "bg-green-900/90 border-green-500/50 text-green-100",
      error: "bg-red-900/90 border-red-500/50 text-red-100",
      warning: "bg-yellow-900/90 border-yellow-500/50 text-yellow-100",
      info: "bg-blue-900/90 border-blue-500/50 text-blue-100",
    };

    return `${baseStyles} ${transformStyles} ${typeStyles[toast.type]}`;
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (toast.type) {
      case 'success':
        return <CheckCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-green-400" />;
      case 'error':
        return <AlertCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-red-400" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="w-5 h-5 flex-shrink-0 text-yellow-400" />;
      case 'info':
        return <Info {...iconProps} className="w-5 h-5 flex-shrink-0 text-blue-400" />;
    }
  };

  return (
    <div className={getToastStyles()}>
      {/* Icon */}
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm mb-1">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-sm opacity-90 leading-relaxed">
            {toast.message}
          </p>
        )}
        
        {/* Action Button */}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-xs font-medium underline hover:no-underline transition-all duration-200 opacity-90 hover:opacity-100"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="ml-3 p-1 rounded-sm hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-sm overflow-hidden">
          <div 
            className="h-full bg-white/40 transition-all ease-linear"
            style={{
              animation: `toast-progress ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes toast-progress {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `
      }} />
    </div>
  );
}

// Convenience hooks for different toast types
export function useSuccessToast() {
  const { addToast } = useToast();
  return (title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'success', title, message, action });
  };
}

export function useErrorToast() {
  const { addToast } = useToast();
  return (title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'error', title, message, action });
  };
}

export function useWarningToast() {
  const { addToast } = useToast();
  return (title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'warning', title, message, action });
  };
}

export function useInfoToast() {
  const { addToast } = useToast();
  return (title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'info', title, message, action });
  };
}

// Cart-specific toast helpers
export function useCartToasts() {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const { addToast } = useToast();

  const addedToCart = (productName: string, viewCartAction?: () => void) => {
    successToast(
      'Added to cart!',
      `${productName} has been added to your cart.`,
      viewCartAction ? {
        label: 'View Cart',
        onClick: viewCartAction
      } : undefined
    );
  };

  const removedFromCart = (productName: string) => {
    addToast({
      type: 'info',
      title: 'Removed from cart',
      message: `${productName} has been removed from your cart.`,
    });
  };

  const cartError = (message: string = 'Something went wrong. Please try again.') => {
    errorToast('Cart Error', message);
  };

  const quantityUpdated = (productName: string, quantity: number) => {
    addToast({
      type: 'info',
      title: 'Quantity updated',
      message: `${productName} quantity changed to ${quantity}.`,
      duration: 3000,
    });
  };

  return {
    addedToCart,
    removedFromCart,
    cartError,
    quantityUpdated,
  };
} 