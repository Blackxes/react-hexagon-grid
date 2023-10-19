import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [["@swc/plugin-styled-components", {}]],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "HexagonGrid",
      fileName: "hexagon-grid",
    },
    rollupOptions: {
      external: ["react", "styled-components"],
      output: {
        globals: {
          react: "React",
          "styled-components": "styled",
        },
      },
    },
  },
});
