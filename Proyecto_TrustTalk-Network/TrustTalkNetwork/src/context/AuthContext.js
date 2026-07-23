// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importa los métodos de Firebase según sea necesario

// AuthContext.js
const AuthContext = createContext({ currentUser: null, setCurrentUser: () => {} });


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(); 

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCurrentUser(user);
    } catch (error) {
      throw error;
    }
  };

  // Otros métodos y estado de autenticación

  const value = {
    currentUser,
    setCurrentUser, // Asegúrate de que setCurrentUser esté incluido en el objeto de contexto
    login,
    // Otros métodos y estado de autenticación
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
