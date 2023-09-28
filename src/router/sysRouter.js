
const routes = [
    {
        path: '/',
        name: 'layout',
        redirect: '/home',
        component: () => import('../layout/index.vue'),
        children: [],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
    },
    {
        path: "/:pathMatch(.*)*",
        hidden: true,
        component: () => import('../layout/other/404.vue'),
    }
];



export default routes;