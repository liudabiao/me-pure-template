<h1 align="center">纯净ant-design-vue-pro中后台 me-pure-tempalte 由刘大彪整理</h1>

# 关于me-pure-template<mp>
基于antd-pro `2.x` 整理，`mp`提供`be api`自动生成、端口代理、模块插拔功能，

# 端口代理
项目在开发生产过程中，后端端口可能非常多，有的时候生产和开发端口也可能弄混，所以`mp`通过`proxy`进行了端口代理。配置如下：
```javascript
//vue.config.js
...
//production、dev为两种模式
//proxyUser为代理端口api前缀，用于识别端口在api.json中使用
const basePort = {
  production: {
    proxyUser: '7001'
  },
  dev: {
    proxyUser: '7001'
  }
}
...

//.env.dev .env.production
//PORT_TYPE 标识使用生产还是开发的端口，如果不配置PORT_TYPE则使用NODE_ENV
NODE_ENV=production
VUE_APP_API_BASE_URL=http://localhost
PORT_TYPE=production
```

# `be api` 自动生成
在`/src/autoApi/apiJson`中添加`[api].json`文件，文件格式如下：
```javascript
{
    "port": "/proxyUser",
    "post": [
        {
            "api": "/auth/login",
            //header,可写可不写， 不写默认为json
            "header": "application/json; charset=utf-8"
        }
    ],
    "get": [
        {
            "api": "ad"
        }
    ]
}
```
在`npm run dev/build`时，会在`/src/api`中生成`[api].js`，`export`的`api`方法名称规则如下：
1. 如果`api`中包含`/`，则使用`api`中最后一个'/'后的字符串为方法名
2. 如果`api`中不包含`/`，则使用`api`为方法名
