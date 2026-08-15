import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function useAuth() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
