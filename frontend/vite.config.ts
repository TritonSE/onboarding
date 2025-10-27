/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  test: {
    environment: "jsdom",
    // Inline the Constellation import to avoid errors about not being
    // able to import CSS files
    deps: {
      inline: ["@tritonse/tse-constellation"],
    },
  },
});
