const routes = [
    {
        path: '/home',
        name: 'Home',
        component: "home/index.vue",
        meta: { title: '首页' },
    },
    {
        path: '/my',
        name: 'My',
        component: "my/index.vue",
        meta: { title: '我的', nav: true },
        children: [
            {
                path: '/my/change-password',
                name: 'ChangePassword',
                component: "my/changepwd.vue",
                meta: { title: '修改密码', tabbar: false, back: true, keepAlive: true },
            }
        ]
    },
    {
        path: '/approve',
        name: 'Approve',
        component: "approve/index.vue",
        meta: { title: '经费审批', nav: true, back: true, tabbar: false, },
    }
];


export default routes;