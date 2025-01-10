import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src"],
  format: [/* "esm"  */ "iife"],
  target: 'es5',
  outDir: "dist",
});
