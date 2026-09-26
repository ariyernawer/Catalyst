import { useNavigate } from "react-router-dom";
import { authApi } from "../models/api/authApi";
import { useAuthContext } from "../models/contexts/useAuthContext";

/**
 * Controller: auth flows (login / register / logout / signup).
 * Orchestrates the auth API (model) and the AuthContext state (model).
 * Views only call these functions — they never touch the API or state directly.
 */
export function useAuthController() {
  const { role, setUser, setRole } = useAuthContext();
  const navigate = useNavigate();

  /** Central 401 handler: clear session and bounce to sign-in. */
  const handleError = (err) => {
    if (err.response && err.response.status === 401) {
      setUser(null);
      setRole(null);
      navigate("/signin");
    }
    throw err;
  };

  /** Sign in with the httpOnly-cookie pattern; returns the profile payload. */
  const login = async (roleName, credentials) => {
    const response = await authApi.login(roleName, credentials);
    setUser(response.data);
    setRole(roleName);
    return response.data;
  };

  /** Register only (no session). Used internally by the signup flows. */
  const register = async (roleName, data) => {
    const response = await authApi.register(roleName, data);
    return response.data;
  };

  /** Clear the server session and local auth state. */
  const logout = async () => {
    try {
      if (role) {
        await authApi.logout(role);
      }
    } finally {
      setUser(null);
      setRole(null);
    }
  };

  /** Participant signup: validate → register → auto-login (cookie pattern). */
  const signupParticipant = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const payload = { ...formData };
    delete payload.confirmPassword;
    await register("participant", payload);
    return login("participant", { email: payload.email, password: payload.password });
  };

  /** Organizer signup: validate → register → auto-login (cookie pattern). */
  const signupOrganizer = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const payload = { ...formData };
    delete payload.confirmPassword;
    await register("organizer", payload);
    return login("organizer", { email: payload.email, password: payload.password });
  };

  return { login, register, logout, signupParticipant, signupOrganizer, handleError };
}