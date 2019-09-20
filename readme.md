# antd-icons-loader
实现antd icons按需加载

### 使用方法
``` javascript
// webpack.js
module.exports = {
  // ...
  resolve: {
    alias: {
      // .antd-icons需要放到src目录下
      "@ant-design/icons/lib/dist$": "path/to/your/.antd-icons"),
    }
  },
  module: {
    rules: [
      // 其他的loaders...
      {
        test: /\.antd-icons$/,
        use: [
          {
            // 将你的(js|ts)的loaders copy到这儿
          },
          "antd-icons-loader",
        ]
      }
    ]
  }
}
{
  // ...
  rules: [
    test: /\.antd-icons$/,
    use: [
      {
        // 你可以copy你的(js|ts)的loaders放到这儿
      },
      "antd-icons-loader",
    ]
  ]
}
```

``` js
// .antd-icons文件
// !!! 此处仅为示例, 实际文件中不得含有注释, 应为标准的json格式, 内容会被 JSON.parse 解析

// 图标可能有三种风格: "outline", "fill", "twotone"
{
  "info": true, // 为 true 则引入三种风格(如果有); "info" 只有 "outline" 风格, 则只会引入 "outline" 风格

  "menu": [], // 空数组则同样引入三种风格(如果有); "menu" 只有 "outline" 风格, 则只会引入 "outline" 风格

  "question-circle": [
    "outline", "twotone" // 对于明确标识的, 则引入所标识风格的图标, 例如这儿只会引入 "outline", "twotone", 不会引入 "fill"
  ],

  "left": [
    "outline", "fill" // "left" 只有 "outline" 风格, 没有 "fill" 风格, 如果使用者错误地引入了, 则会在命令行提示, 需要用户手动输入[ y ]以继续, 表示用户已明确知道这一点.
  ]
}
```
