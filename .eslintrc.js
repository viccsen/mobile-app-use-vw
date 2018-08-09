// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //强制使用逗号，数组、对象当最后一个元素或属性与闭括号 ] 或 } 在不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
    'comma-dangle': ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore",
    }],
    'camelcase': 0,
    // 允许或禁用分号 ASI自动插入 ( [ + - / 前可自行添加分号
    'semi': [ 2, "never" ],
    // 强制对象属性放在不同行上
    'object-property-newline': [2, { "allowMultiplePropertiesPerLine": true }],
    // 禁止行尾空白
    'no-trailing-spaces': 2,
    'quotes': 0,
    'eqeqeq': 0,
    'indent': 0,
    'no-unused-vars': 0,
    'padded-blocks': 0,
    'no-useless-escape': 0,
    'spaced-comment': 0
  }
}
