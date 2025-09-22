import { react } from "@kasoa/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(react as never, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      projectService: true,
    },
  },
});
