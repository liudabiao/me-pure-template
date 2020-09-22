import Vue from 'vue'
import { login, getInfo, logout, getOauthToken } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        let userInfo = {
          'id': '4291d7da9005377ec9aec4a71ea837f',
          'name': '刘大彪',
          'username': 'admin',
          'password': '',
          'avatar': '/avatar.jpeg',
          'status': 1,
          'telephone': '',
          'lastLoginIp': '27.154.74.117',
          'lastLoginTime': 1534837621348,
          'creatorId': 'admin',
          'createTime': 1497160610259,
          'merchantCode': 'TLif2btpzg079h15bk',
          'deleted': 0,
          'roleId': 'admin',
          'role': {}
        }

        const roleObj = {
          'id': 'admin',
          'name': '管理员',
          'describe': '拥有所有权限',
          'status': 1,
          'creatorId': 'system',
          'createTime': 1497160610259,
          'deleted': 0,
          'permissions': [{
            'roleId': 'admin',
            'permissionId': 'defaultIndex',
            'permissionName': '首页',
            'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            'actionEntitySet': [{
              'action': 'add',
              'describe': '新增',
              'defaultCheck': false
            }, {
              'action': 'query',
              'describe': '查询',
              'defaultCheck': false
            }, {
              'action': 'get',
              'describe': '详情',
              'defaultCheck': false
            }, {
              'action': 'update',
              'describe': '修改',
              'defaultCheck': false
            }, {
              'action': 'delete',
              'describe': '删除',
              'defaultCheck': false
            }],
            'actionList': null,
            'dataAccess': null
          }]
        }

        userInfo.role = roleObj

        const response = {
          result: userInfo
        }

        // getInfo().then(response => {
        const result = response.result

        if (result.role && result.role.permissions.length > 0) {
          const role = result.role
          role.permissions = result.role.permissions
          role.permissions.map(per => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              const action = per.actionEntitySet.map(action => { return action.action })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          commit('SET_ROLES', result.role)
          commit('SET_INFO', result)
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }

        commit('SET_NAME', { name: result.name, welcome: welcome() })
        commit('SET_AVATAR', result.avatar)

        resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    },

    //获取单点登录access_token
    async getOauthTwoToken({ }, payload) {
      const res = await getOauthToken({ code: payload })
      console.log(res)
    }
  }
}

export default user
