import React, { useState } from 'react';
import { Button, Input, Card } from './UI';
import { User } from '../types';

interface AuthProps {
  view: 'LOGIN' | 'REGISTER';
  onSwitchMode: () => void;
  onSuccess: (user: User) => void;
}

export const Authentication: React.FC<AuthProps> = ({ view, onSwitchMode, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const validatePassword = (pwd: string) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return pwd.length >= minLength && hasUpper && hasNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (view === 'REGISTER') {
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error("All fields are required.");
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        if (!validatePassword(formData.password)) {
          throw new Error("Password must be at least 8 characters, with 1 uppercase letter and 1 number.");
        }
        
        // Success Register
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          email: formData.email
        };
        onSuccess(newUser);
      } else {
        if (!formData.email || !formData.password) {
          throw new Error("Invalid credentials.");
        }
        // Mock Login
        const mockUser: User = {
          id: 'user_123',
          name: 'Dr. Jane Doe',
          email: formData.email
        };
        onSuccess(mockUser);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {view === 'LOGIN' ? 'Authorized Access' : 'New Analyst Registration'}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {view === 'LOGIN' ? 'Enter your credentials to access the dashboard' : 'Create an account to begin processing'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {view === 'REGISTER' && (
            <Input 
              label="Full Name" 
              name="name" 
              placeholder="Dr. John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          
          <Input 
            label="Email Address" 
            type="email" 
            name="email" 
            placeholder="analyst@forensic.lab"
            value={formData.email}
            onChange={handleChange}
          />
          
          <Input 
            label="Password" 
            type="password" 
            name="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          
          {view === 'REGISTER' && (
            <div className="space-y-2">
               <Input 
                label="Confirm Password" 
                type="password" 
                name="confirmPassword" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <p className="text-xs text-slate-500">
                Requirement: 8+ chars, 1 uppercase, 1 number.
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium flex items-center">
               <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <Button type="submit" className="w-full h-12 text-base" isLoading={loading}>
            {view === 'LOGIN' ? 'Access Dashboard' : 'Register Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">
            {view === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={onSwitchMode}
            className="font-medium text-blue-700 hover:text-blue-900 transition-colors"
          >
            {view === 'LOGIN' ? 'Register' : 'Login'}
          </button>
        </div>
      </Card>
    </div>
  );
};