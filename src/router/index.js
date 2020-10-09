import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import CtrlTec from '@/components/CtrlTec'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Menu',
            component: Menu
        },
        {
            path: '/CtrlTec',
            name: 'EstCtrlTecado',
            component: CtrlTec
        }
    ]
})