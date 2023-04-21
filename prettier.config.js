module.exports = {
  //单行长度
  printWidth: 140,
  //缩进长度
  tabWidth: 2,
  //使用空格代替tab缩进
  useTabs: false,
  //句末使用分号
  semi: true,
  // 对vue中的script及style标签缩进
  vueIndentScriptAndStyle: true,
  //使用单引号
  singleQuote: true,
  //仅在必需时为对象的key添加引号
  quoteProps: 'as-needed',
  // jsx中使用单引号
  jsxSingleQuote: false,
  //多行时尽可能打印尾随逗号
  trailingComma: 'es5',
  //在对象前后添加空格-eg: { foo: bar }
  bracketSpacing: true,
  //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  arrowParens: 'always',
  //无需顶部注释即可格式化
  requirePragma: false,
  //在已被prettier格式化的文件顶部加上标注
  insertPragma: false,
  proseWrap: 'preserve',
  //对HTML全局空白不敏感
  htmlWhitespaceSensitivity: 'ignore',

  //结束行形式
  endOfLine: 'lf',
  //对引用代码进行格式化
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
};
