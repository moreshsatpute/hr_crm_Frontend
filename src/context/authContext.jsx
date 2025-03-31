import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      setLoading(false);
      return;
    }

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const verifyUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
