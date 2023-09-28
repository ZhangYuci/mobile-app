import { createRouter, createWebHashHistory } from "vue-router";
import tool from '../utils/tool';
import sysRouters from "./sysRouter";
import userRouters from "./userRouter";
import sysConfig from "@/config";
import store from "../store"

const viewModules = import.meta.glob("../views/**/*.vue");
const routes = sysRouters;

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        var appEl = document.getElementById('app');
        appEl.scrollTop = 0;
    }
});

let isBuildRouter = false;
router.beforeEach(async (to, from, next) => {

    const token = tool.cookie.get(sysConfig.TOKEN_CACHE_KEY);

    if (to.path === "/login") {
        next();
        isBuildRouter = false;
        return false;
    }

    if (routes.findIndex(r => r.path === to.path) >= 0) {
        next();
        return false;
    }

    //没有登录
    if (!token) {
        next({ path: '/login', query: { redirect: encodeURIComponent(to.path) } });
        return false;
    }

    if (!isBuildRouter) {
        let filterRouter = filterAsyncRouter(userRouters);
        filterRouter = flatAsyncRoutes(filterRouter);

        const keepAliveRoute = filterRouter.filter(x => x.meta?.keepAlive);

        store.commit("app/setKeepAliveRoute", keepAliveRoute);
        filterRouter.forEach(item => {
            router.addRoute('layout', item);
        });
        isBuildRouter = true;
        next({ ...to, replace: true });
        return false;
    }

    next();
});


router.afterEach((to, from) => {

});


function filterAsyncRouter(routerMap) {
    const accessedRouters = [];
    routerMap.forEach(item => {
        item.meta = item.meta ? item.meta : {};
        let route = {
            path: item.path,
            name: item.name,
            meta: item.meta,
            redirect: item.redirect,
            children: item.children ? filterAsyncRouter(item.children) : null,
            component: loadComponent(item.component)
        };
        accessedRouters.push(route);
    });
    return accessedRouters
}

function flatAsyncRoutes(routes, breadcrumb = []) {
    let res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if (tmp.children) {
            let childrenBreadcrumb = [...breadcrumb];
            childrenBreadcrumb.push(route);
            let tmpRoute = { ...route };
            tmpRoute.meta.breadcrumb = childrenBreadcrumb;
            delete tmpRoute.children;
            res.push(tmpRoute);
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb);
            childrenRoutes.map(item => {
                res.push(item);
            });
        } else {
            let tmpBreadcrumb = [...breadcrumb];
            tmpBreadcrumb.push(tmp);
            tmp.meta.breadcrumb = tmpBreadcrumb;
            res.push(tmp);
        }
    })
    return res;
}

function loadComponent(component) {
    if (component) {
        return viewModules[`../views/${component}`];
    } else {
        return () => import("../layout/other/Empty.vue");
    }
}

export default router;