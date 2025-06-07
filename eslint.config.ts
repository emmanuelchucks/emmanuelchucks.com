import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: false,
  react: true,
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
});
