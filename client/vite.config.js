import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
});

// EnvironmentPlugin(
//   { API: "https://pfhenryg.herokuapp.com" },
//   { defineOn: "import.meta.env" }
// ),
