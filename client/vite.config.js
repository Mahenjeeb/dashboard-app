// import { defineConfig, loadEnv } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// import { cwd } from "node:process";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig(() => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // const env = loadEnv(cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      // proxy: {
      //   "/api": {
      //     target: env.VITE_SERVER_URL,
      //     changeOrigin: true,
      //   },
      // },
      port: 3000,
    },
  };
});
