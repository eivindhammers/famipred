'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (name: string, code: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Require the shared code to be set in environment variables for security
const SHARED_CODE = process.env.NEXT_PUBLIC_SHARED_CODE;

if (typeof window !== 'undefined' && !SHARED_CODE) {
  console.error('NEXT_PUBLIC_SHARED_CODE environment variable is not set. Authentication will not work.');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Note: Using localStorage for authentication state is not secure for production apps
    // as it can be easily manipulated by users. For a private family app with trust-based
    // security, this is acceptable. For production, consider httpOnly cookies or proper
    // authentication tokens with server-side session management.
    const storedAuth = localStorage.getItem('famipred_auth');
    const storedName = localStorage.getItem('famipred_name');
    if (storedAuth === 'true' && storedName) {
      setIsAuthenticated(true);
      setUserName(storedName);
    }
  }, []);

  const login = (name: string, code: string): boolean => {
    if (code === SHARED_CODE && name.trim()) {
      setIsAuthenticated(true);
      setUserName(name.trim());
      localStorage.setItem('famipred_auth', 'true');
      localStorage.setItem('famipred_name', name.trim());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    localStorage.removeItem('famipred_auth');
    localStorage.removeItem('famipred_name');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
