import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    loadedTimes: [
      {
        nome: 'Arabia',
        grupo: 'A',
        imgurl: 'https://firebasestorage.googleapis.com/v0/b/yt-dev-meetup-6a846.appspot.com/o/flags%2Farabia.png?alt=media&token=bd495d4a-575f-4ea2-b5e5-f115350aed02'
      },
      {
        nome: 'Russia',
        grupo: 'A',
        imgurl: 'https://firebasestorage.googleapis.com/v0/b/yt-dev-meetup-6a846.appspot.com/o/flags%2Frussia.png?alt=media&token=fac5c120-2ad1-4b5f-ac74-189d02581254'
      }
    ],
    loadedPartidas: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    setLoadedTimes (state, payload) {
      state.loadedTimes = payload
    },
    setLoadedPartidas (state, payload) {
      state.loadedPartidas = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    createGrupo (state, payload) {
      state.loadedTimes.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadTimes ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('times').once('value')
        .then((data) => {
          const times = []
          const obj = data.val()
          for (let key in obj) {
            times.push({
              id: key,
              nome: obj[key].nome,
              grupo: obj[key].grupo,
              imgurl: obj[key].imgurl
            })
          }
          commit('setLoadedTimes', times)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadPartidas ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('partidas').once('value')
        .then((data) => {
          const partidas = []
          const obj = data.val()
          for (let key in obj) {
            partidas.push({
              id: key,
              grupo: obj[key].grupo,
              time1id: obj[key].time1id,
              time2id: obj[key].time2id
            })
          }
          commit('setLoadedPartidas', partidas)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    createPartidas ({commit, getters}, payload) {
      const todasAsPartidas = payload
      todasAsPartidas.forEach(partida => {
        firebase.database().ref('partidas').push(partida)
        .then((data) => {
          const key = data.key
          commit('createPartidas', {
            ...partida,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      })
      // Reach out to firebase and store it
    },
    createGrupo ({commit, getters}, payload) {
      const time1data = {
        nome: payload.time1,
        imgurl: payload.time1url,
        grupo: payload.grupo
      }
      const time2data = {
        nome: payload.time2,
        imgurl: payload.time2url,
        grupo: payload.grupo
      }
      const time3data = {
        nome: payload.time3,
        imgurl: payload.time3url,
        grupo: payload.grupo
      }
      const time4data = {
        nome: payload.time4,
        imgurl: payload.time4url,
        grupo: payload.grupo
      }
      firebase.database().ref('times').push(time1data)
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('createGrupo', {
            ...time1data,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      firebase.database().ref('times').push(time2data)
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('createGrupo', {
            ...time2data,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      firebase.database().ref('times').push(time3data)
          .then((data) => {
            const key = data.key
            console.log(data)
            commit('createGrupo', {
              ...time3data,
              id: key
            })
          })
          .catch((error) => {
            console.log(error)
          })
      firebase.database().ref('times').push(time4data)
            .then((data) => {
              const key = data.key
              console.log(data)
              commit('createGrupo', {
                ...time4data,
                id: key
              })
            })
            .catch((error) => {
              console.log(error)
            })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedTimes (state) {
      return state.loadedTimes
    },
    loadedPartidas (state) {
      return state.loadedPartidas
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
