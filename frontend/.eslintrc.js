/**
 * Created Date: 2021-01-20 09:40:13
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-04-13 04:44:46
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  globals: {
    // webpack.DefinePlugin定义的全局变量，防止eslint检测错误提示
    // appPath: true,
    // apiPrefix: true
  },
  rules: {
    "space-before-function-paren": ["error", "never"],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    // "no-unused-vars": "off",
    // quotes: [
    //   "error",
    //   "single", // 改成字符串必须由单引号括起来而不是双引号，'string'不报错，'string'报错
    // ],
    // semi: [
    //   "error",
    //   "never", // 改成代码结尾不再加分号，加了分号报错，不加分号不报错
    // ],
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
  }
}
