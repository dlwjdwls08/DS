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
      "no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": true,
          "varsIgnorePattern": "^_", // 밑줄(_)로 시작하는 변수는 무시
        },
      ],
      "unused-imports/no-unused-imports": "off", // 불필요한 import 에러 끄기
    },
  },
];

export default eslintConfig;
