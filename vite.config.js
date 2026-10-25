import { defineConfig } from "vite";

// Relative base so the build works at https://<org>.github.io/<repo>/ and on a custom domain.
// public/legacy/ is copied as-is: those classic scripts share globals and must keep their order.
export default defineConfig({
  base: "./",
  build: { outDir: "dist", assetsInlineLimit: 0 },
});
