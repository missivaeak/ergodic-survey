import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: WelcomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/response',
            name: 'response',
            component: () => import('@/views/ResponseView.vue')
        },
        {
            path: '/read',
            name: 'read',
            component: () => import('@/views/ReadView.vue')
        },
        {
            path: '/chapters',
            name: 'chapters',
            component: () => import('@/views/ChaptersView.vue')
        }
    ]
})

export default router
