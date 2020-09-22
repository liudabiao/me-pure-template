const nav = [{
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
}, {
    'name': 'tenementManage',
    'parentId': 0,
    'id': 2,
    'meta': {
        'icon': 'sketch',
        'title': '系统管理',
        'show': true
    },
    'component': 'RouteView',
    'path': 'system-manage'
}, {
    'name': 'menuManage',
    'parentId': 2,
    'id': 21,
    'meta': {
        'icon': 'sketch',
        'title': '菜单管理',
        'show': true
    },
    'component': 'menuManage',
    'path': 'menu-manage'
}]
export default nav