import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "prisma",
    environmentMatchGlobs: [["src/http/controller/**", "prisma"]],
    environmentOptions: {
      adapter: "psql",
      envFile: ".env.test",
    },
  },
});
