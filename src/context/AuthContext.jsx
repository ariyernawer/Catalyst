import { useEffect, useState } from "react";
import { UserContext } from "./userContext";

const STORAGE_KEY = "catalyst-user";
const DEFAULT_USER = { name: "Explorer", email: "", phoneNumber: "", educationLevel: "", interests: [], location: "Dhaka, Bangladesh", bio: "Building thoughtful ideas, one challenge at a time." };

function getInitialUser() {
  try { return { ...DEFAULT_USER, ...JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") }; }
  catch { return DEFAULT_USER; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); }, [user]);
  const updateUser = (updates) => setUser((previous) => ({ ...previous, ...updates }));
  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
}
