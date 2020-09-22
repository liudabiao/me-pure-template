/**
 * 辅助配置
 * 1. 网站标题、描述
 * 2. 登录页footer的链接
 * 3. 部分功能的开启和关闭
 * 4. copyright
 * 5. primaryColor 主要颜色 
 * 6. navTheme 主题 ['dark', 'light'] 两种主题
 * 7. layout 布局 ['sidemenu', 'topmenu'] 传统左右布局和上下布局
 * 8. fixedHeader boolean 固定头部
 * 9. fixSiderbar 固定左侧菜单栏 ： boolean
 * 10. multiTab 多页签模式 boolean,
 * 11. autoHideHeader topmenu时 是否自动隐藏header
 * 12. message - boolean 是否需要消息功能 位置：header上message的icon
 */

const assist = {
    title: '我是网站标题',//网站标题
    describe: '一段普通的描述，特别普通',//网站描述
    otherLogin: true,//其他登录方式
    otherLoginLink: [{
        icon: 'github',
        link: 'https://github.com/login/oauth/authorize?client_id=fa0f3c8a100ac8251f2f&scope=user&redirect_uri=http://localhost:8000'
    }],//其他登录方式的链接
    help: true,//登录页下面的帮助链接是否启用
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
    layout: 'sidemenu',
    fixedHeader: false,
    fixSiderbar: true,
    multiTab: false,
    autoHideHeader: false,
    message: false
}

export default assist
