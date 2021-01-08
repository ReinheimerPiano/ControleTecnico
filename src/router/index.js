import Vue from 'vue'
import Router from 'vue-router'
import CtrlTec from '@/screens/controleTecnico/controleTecnico'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'CtrlTec',
        component: CtrlTec
    }]
})