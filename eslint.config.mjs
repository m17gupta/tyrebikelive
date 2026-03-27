// import { fixupConfigRules } from "@eslint/compat";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// });

// export default [
//   {
//     ignores: ["**/*.js", "**/*.jsx", "src/app/(payload)/**/*", "src/payload-types.ts"],
//   },
//   ...fixupConfigRules(
//     compat.extends(
//       "eslint:recommended",
//       "plugin:@typescript-eslint/recommended-type-checked",
//       "plugin:@typescript-eslint/stylistic-type-checked",
//       "plugin:import/recommended",
//       "plugin:import/typescript",
//       "next/core-web-vitals",
//       "prettier",
//     ),
//   ),
//   {
//     languageOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",

//       parserOptions: {
//         project: "tsconfig.json",
//       },
//     },

//     rules: {
//       "import/order": [
//         "error",
//         {
//           "newlines-between": "always",

//           alphabetize: {
//             order: "asc",
//             orderImportKind: "asc",
//           },

//           groups: ["builtin", "external", "index", "internal", "sibling", "parent", "object", "type"],
//         },
//       ],
//       "@typescript-eslint/consistent-type-definitions": ["error", "type"],

//       "@typescript-eslint/consistent-type-definitions": ["error", "type"],
//       "import/no-mutable-exports": "error",
//       "import/no-cycle": "off", // bring back later
//       "import/no-default-export": "error",

//       // "@typescript-eslint/ban-types": [
//       //   "error",
//       //   {
//       //     types: {
//       //       "{}": false,
//       //     },
//       //   },
//       // ],

//       "@typescript-eslint/consistent-type-imports": [
//         "error",
//         {
//           prefer: "type-imports",
//           fixStyle: "inline-type-imports",
//           disallowTypeAnnotations: false,
//         },
//       ],

//       "import/no-duplicates": [
//         "error",
//         {
//           "prefer-inline": true,
//         },
//       ],

//       "import/namespace": ["off"],
//       "no-empty-pattern": "off",
//       "@typescript-eslint/no-empty-interface": "off",
//       "@typescript-eslint/no-empty-function": "off",
//       "@typescript-eslint/require-await": "off",
//       "@typescript-eslint/return-await": ["error", "in-try-catch"],

//       "@typescript-eslint/no-unused-vars": [
//         "error",
//         {
//           argsIgnorePattern: "^_",
//           varsIgnorePattern: "^_",
//         },
//       ],

//       "@typescript-eslint/restrict-template-expressions": [
//         "error",
//         {
//           allowNumber: true,
//           allowBoolean: true,
//         },
//       ],

//       "@typescript-eslint/no-misused-promises": [
//         "error",
//         {
//           checksVoidReturn: false,
//         },
//       ],

//       "no-restricted-imports": [
//         "error",
//         {
//           name: "next/router",
//           message: "Please use next/navigation instead.",
//         },
//       ],
//     },
//   },
//   {
//     files: ["src/app/**/**/**/**", "**/tailwind.config.ts", "src/payload.config.ts", "src/middleware.ts"],

//     rules: {
//       "import/no-default-export": "off",
//     },
//   },
// ];


import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.js", "**/*.jsx", "src/app/(payload)/**/*", "src/payload-types.ts"],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "next/core-web-vitals",
      "prettier",
    ),
  ),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: "tsconfig.json",
      },
    },

    rules: {
      "import/order": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "import/no-mutable-exports": "off",
      "import/no-cycle": "off", 
      "import/no-default-export": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "import/no-duplicates": "off",
      "import/namespace": "off",
      "no-empty-pattern": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "no-restricted-imports": "off",
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  {
    files: ["src/app/**/**/**/**", "**/tailwind.config.ts", "src/payload.config.ts", "src/middleware.ts"],

    rules: {
      "import/no-default-export": "off",
    },
  },
];
