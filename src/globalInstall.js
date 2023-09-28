import api from "@/api"
import errorHandler from '@/utils/errorHandler'
import { showNotify, showToast } from 'vant';

export default {
    install(app) {

        //挂载全局对象
        app.config.globalProperties.$API = api;
        app.config.globalProperties.$notify = showNotify;
        app.config.globalProperties.$toast = showToast;

        //注册全局组件
        //app.component('componentName', component);

        //注册全局指令
        //app.directive('directiveName',directive)

        //关闭async-validator全局控制台警告
        window.ASYNC_VALIDATOR_NO_WARNING = 1;

        //全局异常捕获
        app.config.errorHandler = errorHandler;
    }
}