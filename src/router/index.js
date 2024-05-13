import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'
import ChatRoom from '../views/ChatRoom.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/chatroom',
        component: ChatRoom
    },
    {
        path: '/chat',
        redirect: '/chatroom'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router