import { useContext } from "react";
import { AuthContext } from "./contexts";

/** Model accessor: read auth state. Mutations go through controllers/authController.js. */
export const useAuthContext = () => {
  return useContext(AuthContext);
};