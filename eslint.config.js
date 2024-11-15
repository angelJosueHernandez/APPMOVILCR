const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        module: "readonly",
      },
    },
    plugins: {
      react: react, // Definir el plugin como objeto
      "react-hooks": reactHooks, // Definir el plugin como objeto
      "@typescript-eslint": typescriptEslint, // Definir el plugin como objeto
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": "off", // Cambiar a "off" para desactivar esta advertencia
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: ["**/.expo/**"], // Ignora la carpeta .expo
  },
];
