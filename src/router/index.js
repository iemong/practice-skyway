import {createRouter, createWebHistory} from 'vue-router'
import Master from '@/views/Master.vue'
import AFrame from "@/views/AFrame";
import Controller from "@/views/Controller";
import Sprite from "@/views/Sprite";

const routes = [
    {
        path: '/',
        name: 'Master',
        component: Master
    },
    {
        path: '/puppet',
        name: 'Puppet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Puppet.vue')
    },
    {
        path: '/controller',
        name: 'Controller',
        component: Controller
    },
    {
        path: '/a_frame',
        name: 'AFrame',
        component: AFrame
    },
    {
        path: '/sprite',
        name: 'Sprite',
        component: Sprite
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
