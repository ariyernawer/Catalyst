import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "participant" | "organizer" | null
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore session on mount (CSE2200 pattern: GET /profile with the httpOnly cookie)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        try {
          const response = await API.get("/participant/profile");
          setUser(response.data);
          setRole("participant");
        } catch (err) {
          if (err.response && err.response.status === 401) {
            try {
              const response = await API.get("/organizer/profile");
              setUser(response.data);
              setRole("organizer");
            } catch {
              setUser(null);
              setRole(null);
            }
          } else {
            setUser(null);
            setRole(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleError = (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        setUser(null);
        setRole(null);
        navigate("/signin");
      }
    }
    throw err;
  };

  const login = async (roleName, credentials) => {
    const response = await API.post(`/${roleName}/login`, credentials);
    setUser(response.data);
    setRole(roleName);
    return response.data;
  };

  const register = async (roleName, data) => {
    const response = await API.post(`/${roleName}/register`, data);
    return response.data;
  };

  const logout = async () => {
    try {
      if (role) {
        await API.post(`/${role}/logout`);
      }
    } finally {
      setUser(null);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, register, logout, handleError, setUser, setRole }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};