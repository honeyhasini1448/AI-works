import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { Authentication } from './components/Authentication';
import { ImageWorkspace } from './components/ImageWorkspace';
import { ToastContainer } from './components/UI';
import { AppView, ToastMessage, User } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Handler
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView(AppView.DASHBOARD);
    addToast(`Welcome back, ${loggedInUser.name}`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setView(AppView.LANDING);
    addToast('Logged out successfully', 'info');
  };

  // Render logic
  const renderContent = () => {
    switch (view) {
      case AppView.LANDING:
        return (
          <Landing 
            onLogin={() => setView(AppView.LOGIN)} 
            onRegister={() => setView(AppView.REGISTER)} 
          />
        );
      case AppView.LOGIN:
        return (
          <Authentication 
            view="LOGIN" 
            onSwitchMode={() => setView(AppView.REGISTER)} 
            onSuccess={handleLogin} 
          />
        );
      case AppView.REGISTER:
        return (
          <Authentication 
            view="REGISTER" 
            onSwitchMode={() => setView(AppView.LOGIN)} 
            onSuccess={handleLogin} 
          />
        );
      case AppView.DASHBOARD:
        if (!user) return null; // Should not happen
        return (
          <ImageWorkspace 
            user={user} 
            onToast={addToast} 
          />
        );
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigateHome={() => setView(user ? AppView.DASHBOARD : AppView.LANDING)} 
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default App;