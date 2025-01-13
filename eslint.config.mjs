import globals from "globals";
import pluginJs from "@eslint/js";
import js from "@eslint/js";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
