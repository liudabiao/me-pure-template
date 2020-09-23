const fs = require('fs')
const path = require('path')

function getAllApiFile() {
    const apis = fs.readdirSync(path.join(__dirname, './apiJson'))
    apis.forEach(api => {
        //获取api.json的内容
        const apiContent = JSON.parse(fs.readFileSync(
            path.join(__dirname, `./apiJson/${api}`),
            'utf8'
        ))
        //api.json中的post请求
        const posts = apiContent.post
        //api.json中的get请求
        const gets = apiContent.get

        //api.js内容
        let contentText = ''
        //引用axios
        contentText += (`import { axios } from '@/utils/request';`)
        contentText += posts.length > 0 ? posts.map(post => {
            const port = apiContent.port
            const apiStr = post.api
            const funcName = apiStr.indexOf('/') >= 0 ? apiStr.split('/').pop() : apiStr
            const header = !!api.header ? api.header : null
            return `export function ${funcName}(data) {return axios({url: "${port}${apiStr.indexOf('/') >= 0 ? '' : '/'}${apiStr}",method: 'post',data${!!header ? `,header:${header}` : ''}})};`
        }).join('') : ''
        contentText += gets.length > 0 ? gets.map(get => {
            const port = apiContent.port
            const apiStr = get.api
            const funcName = apiStr.indexOf('/') >= 0 ? apiStr.split('/').pop() : apiStr
            const header = !!api.header ? api.header : null
            return `export function ${funcName}(param) {return axios({url: "${port}${apiStr.indexOf('/') >= 0 ? '' : '/'}${apiStr}",method: 'get',param${!!header ? `,header:${header}` : ''}})};`
        }).join('') : ''
        fs.writeFileSync(path.join(__dirname, `../../src/api/${api.replace('.json', '.js')}`), contentText, 'utf8')
    })
}

module.exports = getAllApiFile