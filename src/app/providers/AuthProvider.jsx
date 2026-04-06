import { AuthProvider as BaseAuthProvider } from '../../context/AuthContext';

// Centralized app-level provider exports.
// This keeps the feature/context implementation in place while enabling
// a scalable `src/app` boundary for future global providers.
export const AuthProvider = BaseAuthProvider;

