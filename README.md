<h1 align="center">纯净ant-design-vue-pro中后台 由刘大彪整理</h1>

#### 使用LDB_PURE
##### 基础控制
- ico修改

> 将要使用的`logo.png`放入`/public`中，替换文件夹中的此文件

- 替换网站logo

> 将`logo.png`生成`.svg`文件，放入`src/assets`中

- 基础布局（sideMenu、topMenu、primaryColor等）

> `LDB_PURE`将常用的配置项统一处理放在`src/config/assist.config.js`中

```
const assist = {
    title: '我是网站标题',//网站标题
    describe: '一段普通的描述，特别普通',//网站描述
    otherLogin: true,//其他登录方式
    otherLoginLink: [{
        icon: 'wechat',
        link: 'https://www.baidu.com'
    }],//其他登录方式的链接
    help: true,//登录页下面和footer的帮助链接是否启用
    helpLink: [{
        title: '百度',
        link: 'https://www.baidu.com'
    }, {
        title: '百度',
        link: 'https://www.baidu.com'
    }],//登录页下面的帮助链接
    copyright: `2020 刘大彪整理`,
    primaryColor: '#00FF99',
    navTheme: 'dark',//nav主题
    layout: 'topmenu',
    fixedHeader: true,
    fixSiderbar: false,
    multiTab: false,
    autoHideHeader: false,
    message: false
}
```
- 自定义路由和前端配置路由的使用

	- 前端路由
	> 前端固定路由的配置在`src/config/router.config`中配置（如果项目不需要使用权限、角色的话，推荐此种配置）
	- 自定义路由请阅读[README.md](./src/router/README.md)

(未完待续)