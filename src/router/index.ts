import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/components/Layout.vue')
const User = () => import('@/views/User.vue')
const Question = () => import('@/views/Question.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/users',
    children: [
      {
        path: '/users',
        name: 'Users',
        component: User,
        meta: { title: '用户管理' },
      },
      {
        path: '/questions',
        name: 'Questions',
        component: Question,
        meta: { title: '题目管理' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 动态修改页面标题
router.beforeEach((to, _, next) => {
  document.title = (to.meta.title as string) || 'Quit 管理系统'
  next()
})

export default router
