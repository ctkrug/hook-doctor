import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so the built site works when served from any subpath,
  // e.g. apps.charliekrug.com/hook-doctor.
  base: "./",
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
  },
});
