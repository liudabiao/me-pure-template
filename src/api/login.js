import { axios } from '@/utils/request';export function login(data) {return axios({url: "/proxyUser/auth/login",method: 'post',data})};export function ad(param) {return axios({url: "/proxyUser/ad",method: 'get',param})};