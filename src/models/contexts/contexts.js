import { createContext } from 'react';

/**
 * Model: context containers (state stores).
 * Providers live in AuthContext.jsx / OrganizerContext.jsx,
 * accessors in useAuthContext.js / useOrganizer.js.
 */
export const AuthContext = createContext();
export const OrganizerContext = createContext(null);