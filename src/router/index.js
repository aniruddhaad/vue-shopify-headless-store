import { createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Product from '../pages/Product.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/product/:handle',
        name: 'Product',
        component: Product,
    },
    {
        path: '/cart',
        component: () => import('../pages/Cart.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router