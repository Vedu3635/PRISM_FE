/**
 * Legacy Firebase config compatibility shim
 * ───────────────────────────────────────────
 * Maintained for backward compatibility.
 * New code should import from '../config' or '../config/firebase' directly.
 */
export { app, analytics, auth, googleProvider } from '../config/firebase';
export { default } from '../config/firebase';