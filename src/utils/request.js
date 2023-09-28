import axios from "axios";
import tool from "@/utils/tool"
import sysConfig from "@/config"
import { showNotify } from 'vant'

//创建axios实例
const axiosInstance = axios.create({
    baseURL: sysConfig.API_URL,
    timeout: sysConfig.TIMEOUT
});

//请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        //全局TOKEN
        let token = tool.cookie.get(sysConfig.TOKEN_CACHE_KEY);
        if (token) {
            config.headers[sysConfig.TOKEN_NAME] = `${sysConfig.TOKEN_PREFIX}${token}`;
        }
        //取消浏览器GET请求缓存
        if (!sysConfig.REQUEST_CACHE && config.method == 'get') {
            config.params = config.params || {};
            config.params['_'] = new Date().getTime();
        }
        //合并全局Header
        Object.assign(config.headers, sysConfig.HEADERS)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


//响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status == 404) {
                showNotify({
                    type: 'danger',
                    message: 'Status:404,正在请求不存在的服务器记录!'
                });
            } else if (error.response.status == 500) {
                showNotify({
                    type: 'danger',
                    message: error.response.data.message || "Status:500,服务器发生错误!"
                });
            } else if (error.response.status == 401) {
                // ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
                //     type: 'error',
                //     closeOnClickModal: false,
                //     center: true,
                //     confirmButtonText: '重新登录'
                // }).then(() => {
                //     router.replace({ path: '/login' });
                // }).catch(() => { })
            } else {
                showNotify({
                    type: 'danger',
                    message: error.message || `Status:${error.response.status}，未知错误!`
                });
            }
        } else {
            showNotify({
                type: 'danger',
                message: '请求服务器无响应!'
            });
        }

        return Promise.reject(error.response);
    }
);


let http = {
    /** get 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     * @param  {参数} config
     */
    get: function (url, params = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'get',
                url: url,
                params: params,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },

    /** post 请求
     * @param  {接口地址} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    post: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'post',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },

    /** put 请求
     * @param  {接口地址} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    put: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'put',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },

    /** patch 请求
     * @param  {接口地址} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    patch: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'patch',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },

    /** delete 请求
     * @param  {接口地址} url
     * @param  {请求参数} data
     * @param  {参数} config
     */
    delete: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            axiosInstance({
                method: 'delete',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },

    /** jsonp 请求
     * @param  {接口地址} url
     * @param  {JSONP回调函数名称} name
     */
    jsonp: function (url, name = 'jsonp') {
        return new Promise((resolve) => {
            let script = document.createElement('script')
            let _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
            script.id = _id
            script.type = 'text/javascript'
            script.src = url
            window[name] = (response) => {
                resolve(response)
                document.getElementsByTagName('head')[0].removeChild(script)
                try {
                    delete window[name];
                } catch (e) {
                    window[name] = undefined;
                }
            }
            document.getElementsByTagName('head')[0].appendChild(script)
        })
    }
}

export default http;

