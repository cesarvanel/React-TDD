import { mergeConfig, defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["src/e2e/**/*.test.tsx"],
      environment: "jsdom",
      globals: true,
      setupFiles: "src/e2e/setup.ts",
    },
  })
);
