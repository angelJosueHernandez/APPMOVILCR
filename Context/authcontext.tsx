import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: string | null;
  setUser: (user: string | null) => void;
  correoGuardar: string | null;
  setCorreoGuardar: (correo: string | null) => void;
  loading: boolean; // Estado de carga agregado
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [correoGuardar, setCorreoGuardar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true); // Inicia el estado de carga
      const token = await AsyncStorage.getItem('jwt');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);

          if (decodedToken && decodedToken.nombre && decodedToken.correo) {
            setIsAuthenticated(true);
            setUser(decodedToken.nombre);
            setCorreoGuardar(decodedToken.correo);
          } else {
            // Si el token no contiene la estructura esperada
            console.warn("El token no contiene la estructura esperada");
            setIsAuthenticated(false);
            setUser(null);
            setCorreoGuardar(null);
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          setIsAuthenticated(false);
          setUser(null);
          setCorreoGuardar(null);
        }
      } else {
        console.log("No se encontró ningún token almacenado en AsyncStorage.");
        setIsAuthenticated(false);
      }
      setLoading(false); // Finaliza el estado de carga
    };
    checkAuth();
  }, []);

  if (loading) {
    return null; // O podrías mostrar un indicador de carga aquí.
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        correoGuardar,
        setCorreoGuardar,
        loading, // Pasar el estado de carga al contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
