import { authApi } from "../models/api/authApi";

/**
 * Controller: boot-time session hydration.
 * Called once by AuthProvider on mount. Lives in its own file (no context
 * import) so the model layer never depends on the controller layer.
 *
 * @param {{ setUser: Function, setRole: Function, setLoading: Function }} setters
 */
export async function restoreSession({ setUser, setRole, setLoading }) {
  try {
    setLoading(true);
    try {
      const response = await authApi.getProfile("participant");
      setUser(response.data);
      setRole("participant");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        try {
          const response = await authApi.getProfile("organizer");
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
}