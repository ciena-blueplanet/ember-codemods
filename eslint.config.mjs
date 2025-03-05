import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["**/fixtures/", "dist"] },
  { languageOptions: { globals: globals.node } },
  { rules: { "@typescript-eslint/consistent-type-imports": "error" } },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  prettierPlugin,
);
