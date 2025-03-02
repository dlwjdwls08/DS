import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "args": "after-used", // 사용되지 않은 인자 중 마지막 이후만 체크
          "argsIgnorePattern": "^_", // 밑줄(_)로 시작하는 변수는 무시
          "ignoreRestSiblings": true,
        },
      ],
    },
  },
];

export default eslintConfig;
