// Django Backend API Base URL
// Empty = same origin as the frontend: nginx (production) or the "proxy" in package.json (npm start)
// forwards /api/ and /control_selection/ to Django. REACT_APP_API_URL is baked in at build time.
export const API_BASE_URL = process.env.REACT_APP_API_URL || '';
