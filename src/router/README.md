自定义路由配置
=====================
### 配置结构如下(请保证结构统一规范)
```
[{
    'name': 'defaultIndex',
    'parentId': 0,
    'id': 1,
    'meta': {
      'icon': 'sketch',
      'title': '首页',
      'show': true
    },
    'component': 'defaultIndex',
    'path': 'default-index'
  }]
```
> 数据库中存储的路由是一维的，需要保存父节点ID，即`parentID`

### 自定义路由逻辑梳理
- 首先在router的钩子beforeRoutes中调用接口
- 接口会返回一维数组的路由
- antd-pro-vue将一维数组处理成路由树
- 然后使用addRoutes添加到vue的路由树中

### 自定义路由使用流程
- 在 `src/router/generator-routes.js`文件中 添加路由模块引用，如下

```
  //默认首页（固定不用改）
  'defaultIndex': () => import('@/views/defaultIndex/defaultIndex'),
```
- 使用管理员页面添加路由（角色权限配置，如果需要的话）




