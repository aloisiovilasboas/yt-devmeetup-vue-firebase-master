import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Regras from '@/components/Regras'
import Sobre from '@/components/Sobre'
import Perfil from '@/components/User/Perfil'
import Ranking from '@/components/User/Ranking'
import Apostas from '@/components/User/Apostas'
import ApostasCadastradas from '@/components/User/ApostasCadastradas'
import Admin from '@/components/Admin/Admin'
import Usuarios from '@/components/Admin/Usuarios'
import Cadastre from '@/components/Admin/Cadastre'
import Gabarito from '@/components/Admin/Gabarito'
import Signin from '@/components/User/Signin'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/regras',
      name: 'Regras',
      component: Regras
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: Sobre
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/apostas',
      name: 'Apostas',
      component: Apostas
    },
    {
      path: '/apostasCadastradas',
      name: 'ApostasCadastradas',
      component: ApostasCadastradas,
      beforeEnter: AuthGuard
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios,
      beforeEnter: AuthGuard
    },
    {
      path: '/Gabarito',
      name: 'Gabarito',
      component: Gabarito,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking
    },
    {
      path: '/cadastre/:id',
      name: 'Cadastre',
      props: true,
      component: Cadastre
    },
    {
      path: '/perfil/:id',
      name: 'Perfil',
      props: true,
      component: Perfil
    }
  ],
  mode: 'history'
})
