import { useState, useEffect } from "react";
import { AuthContext } from "./contexts";
import { restoreSession } from "../../controllers/sessionController";

/**
 * Model: authentication state manager.
 * All orchestration (login, register, logout, session restore) lives in
 * controllers/authController.js and controllers/sessionController.js.
 * Views read state via useAuthContext and dispatch through the controllers.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "participant" | "organizer" | null
  const [loading, setLoading] = useState(true);

  // Restore session on mount (orchestrated by the session controller).
  useEffect(() => {
    restoreSession({ setUser, setRole, setLoading });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, setUser, setRole, setLoading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};