import * as VueRouter from 'vue-router'
import Home from '@/../views/home'
import My from '@/../views/my'
import ViewQuestion from "../views/question/ViewQuestion";
import SaveQuestion from "../views/question/SaveQuestion";

import AutoGenerate from "../views/generate/AutoGenerate";
import ManualGenerate from "../views/generate/ManualGenerate"

import FinalPaper from "../views/paper/FinalPaper";
const routes = [
    {
        path:'/',
        name:'home',
        component: Home
    },
    {
        path: '/my',
        name: 'my',
        component: My
    },
    {
        path: '/question_view',
        name: 'view',
        component: ViewQuestion
    },
    {
        path: '/question_save',
        name: 'save',
        component: SaveQuestion
    },
    {
        path: '/smart_generate',
        name: 'autogenerate',
        component: AutoGenerate
    },
    {
        path: '/manual_generate',
        name: 'manualgenerate',
        component: ManualGenerate
    },
    {
        path: '/paper2word',
        name: 'paper2word',
        component: FinalPaper
    }

]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router
