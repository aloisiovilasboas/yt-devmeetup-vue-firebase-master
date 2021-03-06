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
      /* apiKey: 'AIzaSyCKs49igWzbq7boGVJOsUBI098EHn74JVs',
      authDomain: 'bolaoafc2018.firebaseapp.com',
      databaseURL: 'https://bolaoafc2018.firebaseio.com',
      projectId: 'bolaoafc2018',
      storageBucket: 'bolaoafc2018.appspot.com' */
     // yt-dev-meetup abaixo
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
  //  this.$store.dispatch('loadUsuarios')
  //  this.$store.dispatch('loadTimes')
   // this.$store.dispatch('loadPartidas')
   // this.$store.dispatch('loadFases')
   // this.$store.dispatch('loadRanking')
    this.$store.dispatch('loadAdmins')
    //  this.$store.dispatch('loadApostas')
    //  this.$store.dispatch('loadApostasSalvas')
   // this.$store.dispatch('loadGabarito')
  }
})
