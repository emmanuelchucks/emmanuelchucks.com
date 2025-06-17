import antfu from "@antfu/eslint-config";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import * as reactCompiler from "eslint-plugin-react-compiler";

export default antfu(
  {
    stylistic: false,
    react: true,
    typescript: {
      tsconfigPath: "tsconfig.json",
    },
  },
  {
    ...eslintPluginBetterTailwindcss.configs.recommended,
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "./src/app/style.css",
      },
    },
  },
  reactCompiler.configs.recommended,
);
