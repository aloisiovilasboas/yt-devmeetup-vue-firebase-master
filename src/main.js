import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBfaK1Ve-8aVRCquVum_mivOS1_mkD30bw',
      authDomain: 'yt-dev-meetup-6a846.firebaseapp.com',
      databaseURL: 'https://yt-dev-meetup-6a846.firebaseio.com',
      projectId: 'yt-dev-meetup-6a846',
      storageBucket: 'yt-dev-meetup-6a846.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
    this.$store.dispatch('loadTimes')
    this.$store.dispatch('loadPartidas')
  }
})
