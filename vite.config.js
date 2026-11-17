import { defineConfig } from "vite";
import { resolve } from "node:path";

// Relative base so the build works at https://<org>.github.io/<repo>/ and on a custom domain.
// public/legacy/ is copied as-is: those classic scripts share globals and must keep their order.
// Two pages: the Studio (index.html) and the CMA and Investor Report (cma.html, made by tools/build-cma.py).
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    rollupOptions: { input: { main: resolve(import.meta.dirname, "index.html"), cma: resolve(import.meta.dirname, "cma.html") } },
  },
});
