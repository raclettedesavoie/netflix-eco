export const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://netflix-eco-1.onrender.com"  // ton URL de prod (à remplacer)
  : "https://localhost:7238";