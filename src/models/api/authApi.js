import API from "./client";

// Centralized auth endpoints (participant | organizer)
export const authApi = {
  login: (role, credentials) => API.post(`/${role}/login`, credentials),
  register: (role, data) => API.post(`/${role}/register`, data),
  logout: (role) => API.post(`/${role}/logout`),
  getProfile: (role) => API.get(`/${role}/profile`),
};