import React from 'react';
import { Loader2, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ToastMessage } from '../types';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 shadow-md",
    secondary: "bg-blue-100 text-blue-900 hover:bg-blue-200",
    outline: "border border-slate-300 hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700">{label}</label>}
      <input
        className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

// --- Toast ---
export const ToastContainer: React.FC<{ toasts: ToastMessage[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center w-full max-w-xs p-4 space-x-3 text-sm rounded-lg shadow-lg border-l-4 transition-all animate-in slide-in-from-right-full
            ${toast.type === 'success' ? 'bg-white border-green-500 text-slate-800' : ''}
            ${toast.type === 'error' ? 'bg-white border-red-500 text-slate-800' : ''}
            ${toast.type === 'info' ? 'bg-white border-blue-500 text-slate-800' : ''}
          `}
          role="alert"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
          <div className="flex-1 font-medium">{toast.message}</div>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};