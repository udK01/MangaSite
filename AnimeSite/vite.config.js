import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // This makes the server accessible externally
    port: 5173, // You can specify any port you prefer
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
