import http from '../../utils/request';

export default {
    getAccessToken: {
        url: `/system/access-token/`,
        name: "登录获取TOKEN",
        get: async function (token) {
            return await http.get(this.url + token);
        }
    }
}