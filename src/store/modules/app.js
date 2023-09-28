import tool from "@/utils/tool"
import sysConfig from "@/config"

export default {
    namespaced: true,
    state: {
        appToken: tool.cookie.get(sysConfig.TOKEN_CACHE_KEY),
        keepAliveRoute: [],
        viewScrollBehavior: [],
        appTabbarMenu: [{ title: '首页', path: '/home', icon: 'home-o' }, { title: '我的', path: '/my', icon: 'contact' }]
    },
    getters: {
        getAppToken(state) {
            return state.appToken;
        },
        getKeepAliveRoute(state) {
            return state.keepAliveRoute;
        },
        getViewScrollBehavior(state) {
            return state.viewScrollBehavior;
        }
    },
    mutations: {
        setAppToken(state, token) {
            tool.cookie.set(sysConfig.TOKEN_CACHE_KEY, token);
        },
        logout(state) {
            tool.cookie.remove(sysConfig.TOKEN_CACHE_KEY);
        },
        setKeepAliveRoute(state, keepAliveRoute) {
            const routeName = keepAliveRoute.map(x => x.name);
            state.keepAliveRoute = routeName;
        },
        updateViewScrollBehavior(state, scrollBehavior) {

        },
        setAppMenu(state, appMenu) {
            state.appMenu = appMenu;
        },
    },
    actions: {

    }
}