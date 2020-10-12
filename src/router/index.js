import Vue from 'vue'
import Router from 'vue-router'
import CtrlTec from '@/components/CtrlTec'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'CtrlTec',
        component: CtrlTec
    }]
})