import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Grupo1 from '@/components/Apostas/Grupo1'
import Apostas from '@/components/User/Apostas'
import Admin from '@/components/User/Admin'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import CreateDatas from '@/components/Admin/CreateDatas'
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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/grupo1',
      name: 'Grupo1',
      component: Grupo1,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/CreateDatas',
      name: 'CreateDatas',
      component: CreateDatas,
      beforeEnter: AuthGuard
    },
    {
      path: '/CreateGrupo',
      name: 'CreateGrupo',
      component: CreateGrupo,
      beforeEnter: AuthGuard
    },
    {
      path: '/apostas',
      name: 'Apostas',
      component: Apostas,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
