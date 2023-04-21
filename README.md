# temp-cli-h5


## 注意事项
- [x] 项目严格按照代码规范编写，规范项目代码格式化以及`commit git` 规范； 具体提交规范请查看： `commitlint.config.js`
- [x] `vant` 移动端组件采用v4版本； 
- [x] `vant` 不需要在`main.js` 再次引入，已经在`vue.config.js` 按需引入处理过了;
- [x] `vant` 页面涉及到金额的计算， 以及金额的处理, 不需要再次编写二次函数去处理; 可以使用`currency.js`; [查看文档](https://currency.js.org/);
- [x] 对于h5页面，使用`pinia` 状态管理器，体积更小，更便捷;


## 环境部署
### 淘宝源安装及设置
> yarn config set registry https://registry.npm.taobao.org -g  
> yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g

### 项目运行
``` js
 // 尽量使用yarn install nodes包  ||  npm install
 yarn install
 npm install
 // 项目启动
 yarn run serve
```


