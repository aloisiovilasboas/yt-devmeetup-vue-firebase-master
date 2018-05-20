import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Apostas from '@/components/User/Apostas'
import Admin from '@/components/Admin/Admin'
import Usuarios from '@/components/Admin/Usuarios'
import Cadastre from '@/components/Admin/Cadastre'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import CreateGrupo from '@/components/Admin/CreateGrupo'
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
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/apostas',
      name: 'Apostas',
      component: Apostas,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/CreateGrupo',
      name: 'CreateGrupo',
      component: CreateGrupo,
      beforeEnter: AuthGuard
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/cadastre/:id',
      name: 'Cadastre',
      props: true,
      component: Cadastre
    }
  ],
  mode: 'history'
})
