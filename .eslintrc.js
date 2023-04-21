module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    // parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', 'prettier'],
  globals: {
    process: true,
  },
  rules: {
    // 不允许出现console语句
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 不允许出现debugger语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 生成器前后空格
    'generator-star-spacing': 'off',
    // 不能有声明未被使用的变量或参数
    'no-unused-vars': 'warn',
    // 不允许出现不规则的空格
    'no-irregular-whitespace': 'warn',
    // 不允许混用tab和空格
    'no-mixed-spaces-and-tabs': 'warn',
    // 创建对象子面量不能重复
    'no-dupe-keys': 'error',
    // 函数参数不能重复
    'no-dupe-args': 'error',
    // 块语句中使用var
    'block-scoped-var': 'error',
    // 禁止不必要地嵌套块
    'no-lone-blocks': 'error',
    // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-constant-condition': 'error',
    'no-warning-comments': [
      'error',
      {
        // 不能有警告备注
        terms: ['todo', 'fixme', 'any other term'],
        location: 'anywhere',
      },
    ],
    // 必须使用 if(){} 中的{}
    curly: 'warn',
    // 中缀操作符周围要不要有空格
    'space-infix-ops': 'error',
    //在return，throw，continue，break语句后不允许出现不可能到达的语句
    'no-unreachable': 'error',
    //要求检查NaN的时候使用isNaN()
    'use-isnan': 'error',
    //不允许出现空的代码块
    'no-empty': 'error',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'off',
    // 要求使用 === 和 !==
    eqeqeq: 'off',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次de声明同一变量
    'no-redeclare': 'warn',
    // 禁止出现;
    // semi: ['warn', 'always'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    'no-var': 'warn',
  },
};
