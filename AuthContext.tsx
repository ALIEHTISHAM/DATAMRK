import React, { createContext, useContext, useState, ReactNode } from 'react';
import { connectMetaMask } from './metamaskAuth';
import { initContract, registerUser, authenticateUser } from '../contractservice';
import { hashEmail, hashPassword } from './hashUtils';

interface AuthContextProps {
  walletAddress: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    try {
      const address = await connectMetaMask();
      const emailHash = hashEmail(email);
      const passwordHash = hashPassword(password); // Hash the password before sending

      await initContract();

      // Call smart contract function to register user with email hash
      await registerUser(emailHash);

      // Send registration request to the server
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailHash, passwordHash, walletAddress: address }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error text from response
        throw new Error(`Failed to register: ${errorText}`);
      }

      setWalletAddress(address);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const address = await connectMetaMask();
      const emailHash = hashEmail(email);
      const passwordHash = hashPassword(password); // Hash the entered password

      await initContract();

      // Use the smart contract to verify the user
      const isAuthenticated = await authenticateUser(address, emailHash);

      if (isAuthenticated) {
        // Fetch user details from the server for further verification
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailHash, passwordHash }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setWalletAddress(address);
        } else {
          throw new Error(result.error || 'Authentication failed');
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setWalletAddress(null);
  };

  return (
    <AuthContext.Provider value={{ walletAddress, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
