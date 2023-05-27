import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig(async ({ command }) => ({
  test: {
    typecheck: { ignoreSourceErrors: true },
    passWithNoTests: true,
    globals: true,
    environment: "jsdom",
    //includeSource: ['src/index.ts'],
  },
  plugins: [
    tsconfigPaths(),
    solidPlugin({ babel: { plugins: ["typewind/babel"] } }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    sourcemap: true,
  },
}));
