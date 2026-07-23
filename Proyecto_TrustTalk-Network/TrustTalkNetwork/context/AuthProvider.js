// AuthProvider.js
import React, { createContext, useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { appFirebase, auth } from '../credenciales'; // Importa appFirebase y auth desde tu archivo credenciales.js

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const authInstance = getAuth();

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;
      setCurrentUser(user);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
