import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react", "react-dom"],
  minify: false,
  sourcemap: true,
});
