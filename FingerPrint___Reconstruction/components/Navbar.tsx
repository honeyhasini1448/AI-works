import React from 'react';
import { Fingerprint, UserCircle, LogOut } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigateHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigateHome }) => {
  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
            <div className="flex-shrink-0 flex items-center text-blue-900">
              <Fingerprint className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl tracking-tight">Forensic<span className="text-blue-600">Trace</span></span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center text-sm text-slate-600">
                  <UserCircle className="h-5 w-5 mr-1" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <span className="text-xs text-slate-400 font-mono">V 1.0.0 SECURE</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;