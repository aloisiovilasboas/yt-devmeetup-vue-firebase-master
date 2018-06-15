import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    gabarito: null,
    minhasApostas: null,
    loadedApostas: [],
    loadedApostasSalvas: [],
    loadedAdmins: [],
    loadedUsuarios: [],
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
    loadedTimes: [],
    /*
      {
        nome: 'Arabia',
        grupo: 'A',
        imgurl: 'https://firebasestorage.googleapis.com/v0/b/yt-dev-meetup-6a846.appspot.com/o/flags%2Farabia.png?alt=media&token=bd495d4a-575f-4ea2-b5e5-f115350aed02'
      },
      {
        nome: 'Russia',
        grupo: 'A',
        imgurl: 'https://firebasestorage.googleapis.com/v0/b/yt-dev-meetup-6a846.appspot.com/o/flags%2Frussia.png?alt=media&token=fac5c120-2ad1-4b5f-ac74-189d02581254'
      } */
    loadedPartidas: [],
    loadedFases: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    setLoadedApostas (state, payload) {
      state.loadedApostas = payload
    },
    setLoadedApostasSalvas (state, payload) {
      state.loadedApostasSalvas = payload
    },
    setLoadedAdmins (state, payload) {
      state.loadedAdmins = payload
    },
    setLoadedUsuarios (state, payload) {
      state.loadedUsuarios = payload
    },
    setLoadedTimes (state, payload) {
      state.loadedTimes = payload
    },
    setLoadedPartidas (state, payload) {
      state.loadedPartidas = payload
    },
    setLoadedFases (state, payload) {
      state.loadedFases = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    createAdmin (state, payload) {
      state.loadedAdmins.push(payload)
    },
    createUsuario (state, payload) {
      state.loadedUsuarios.push(payload)
    },
    cadastraUsuario (state, payload) {
      var uindex = state.loadedUsuarios.findIndex((user) => {
        return (user.id === payload.id)
      })
      payload.usuario.id = payload.id
      state.loadedUsuarios[uindex] = payload.usuario
    },
    deleteUsuario (state, payload) {
      var uindex = state.loadedUsuarios.findIndex((user) => {
        return (user.id === payload.id)
      })
      if (uindex > -1) {
        state.loadedUsuarios.splice(uindex, 1)
      }
    },
    createGrupo (state, payload) {
      state.loadedTimes.push(payload)
    },
    setMinhasApostas (state, payload) {
     // console.log('paulo: ')
     // console.log(payload)
      state.minhasApostas = payload
    },
    setaGabarito (state, payload) {
      // console.log('paulo: ')
      // console.log(payload)
      state.gabarito = payload
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
    loadApostas ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('apostas').once('value')
        .then((data) => {
          const apostas = []
          const obj = data.val()
          for (let key in obj) {
            apostas.push({
              id: key,
              fases: obj[key].fases,
              grupos: obj[key].grupos,
              usuarioid: obj[key].usuarioid
            })
          }
          commit('setLoadedApostas', apostas)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadApostasSalvas ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('apostasSalvas').once('value')
        .then((data) => {
          const apostas = []
          const obj = data.val()
          for (let key in obj) {
            apostas.push({
              id: key,
              fases: obj[key].fases,
              grupos: obj[key].grupos,
              usuarioid: obj[key].usuarioid
            })
          }
          commit('setLoadedApostasSalvas', apostas)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadMinhasApostas ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('apostas/' + store.getters.user.id).once('value')
        .then((data) => {
          const minhasApostas = {grupos: data.val().grupos, fases: data.val().fases}
          commit('setMinhasApostas', minhasApostas)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadGabarito ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('gabarito').once('value')
        .then((data) => {
          const gabarito = {grupos: data.val().grupos, fases: data.val().fases, ultimojogoT1: data.val().ultimojogoT1, ultimojogoT2: data.val().ultimojogoT2, ultimojogoT1gols: data.val().ultimojogoT1gols, ultimojogoT2gols: data.val().ultimojogoT2gols}
          commit('setaGabarito', gabarito)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadAdmins ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('admins').once('value')
        .then((data) => {
          const admins = []
          const obj = data.val()
          for (let key in obj) {
            admins.push({
              id: key,
              adminId: obj[key].id,
              nome: obj[key].nome,
              addedby: obj[key].addedby
            })
          }
          commit('setLoadedAdmins', admins)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadUsuarios ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('usuarios').once('value')
        .then((data) => {
          const usuarios = []
          const obj = data.val()
          for (let key in obj) {
            usuarios.push({
              id: key,
              nomeOriginal: obj[key].nomeOriginal,
              nome: obj[key].nome,
              email: obj[key].email,
              pendente: obj[key].pendente,
              pago: obj[key].pago,
              addedby: obj[key].addedby
            })
          }
          commit('setLoadedUsuarios', usuarios)
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
              time2id: obj[key].time2id,
              data: obj[key].data,
              hora: obj[key].hora
            })
          }
          partidas.sort(function (partidaA, partidaB) {
            var mesA = Number(partidaA.data.substring(3))
            var mesB = Number(partidaB.data.substring(3))
            if (mesA - mesB !== 0) {
              return mesA - mesB
            } else {
              var diaA = Number(partidaA.data.substring(0, 2))
              var diaB = Number(partidaB.data.substring(0, 2))
              if (diaA - diaB !== 0) {
                return diaA - diaB
              } else {
                var horaA = Number(partidaA.hora.substring(0, 2))
                var horaB = Number(partidaB.hora.substring(0, 2))
                return horaA - horaB
              }
            }
          })
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
    loadFases ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('fases').once('value')
        .then((data) => {
          const fases = []
          const obj = data.val()
          for (let key in obj) {
            fases.push({
              id: key,
              fase: obj[key].fase,
              partidas: obj[key].partidas
            })
          }
        /*   fases.forEach(fase => {
            fase.partidas.sort(function (partidaA, partidaB) {
              var mesA = Number(partidaA.data.substring(3))
              var mesB = Number(partidaB.data.substring(3))
              if (mesA - mesB !== 0) {
                return mesA - mesB
              } else {
                var diaA = Number(partidaA.data.substring(0, 2))
                var diaB = Number(partidaB.data.substring(0, 2))
                if (diaA - diaB !== 0) {
                  return diaA - diaB
                } else {
                  var horaA = Number(partidaA.hora.substring(0, 2))
                  var horaB = Number(partidaB.hora.substring(0, 2))
                  return horaA - horaB
                }
              }
            })
          }) */
          commit('setLoadedFases', fases)
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
    createAdmin ({commit, getters}, payload) {
      const adminid = payload.id
      const adminnome = payload.nome
      const newAdmin = {id: adminid, nome: adminnome, addedby: store.getters.user.id}
      firebase.database().ref('admins').push(newAdmin)
      .then((data) => {
        const key = data.key
        commit('createAdmin', {
          ...newAdmin,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createUsuario ({commit, getters}, payload) {
      const nomeUsuario = payload
      const novoUsuario = {nomeOriginal: nomeUsuario, addedby: store.getters.user.id, pendente: true}
      firebase.database().ref('usuarios').push(novoUsuario)
      .then((data) => {
        const key = data.key
        commit('createUsuario', {
          ...novoUsuario,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    cadastraUsuario ({commit, getters}, payload) {
      var usuario = {nomeOriginal: payload.nomeOriginal, addedby: payload.addedby, nome: payload.nome, email: payload.email, pendente: false}
      const id = payload.id
     // console.log(payload)
      firebase.database().ref('usuarios/' + id).set(usuario).then((data) => {
      //  console.log(data)
        commit('cadastraUsuario', {id: id, usuario: usuario})
      }).catch((error) => {
        console.log(error)
      })
    },
    cadastraPagamentoDeCadastrado ({commit, getters}, payload) {
      var usuario = {
        nomeOriginal: payload.nomeOriginal,
        addedby: payload.addedby,
        nome: payload.nome,
        email: payload.email,
        pago: payload.pago,
        pendente: payload.pendente
      }
      const id = payload.id
     // console.log(payload)
      firebase.database().ref('usuarios/' + id).set(usuario).then((data) => {
      //  console.log(data)
        commit('cadastraUsuario', {id: id, usuario: usuario})
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteUsuario ({commit, getters}, payload) {
      const id = payload.id
     // console.log(payload)
      firebase.database().ref('usuarios/' + id).set(null).then((data) => {
      //  console.log(data)
        commit('deleteUsuario', {id: id})
      }).catch((error) => {
        console.log(error)
      })
    },
    cadastraPagamentoDePendente ({commit, getters}, payload) {
      var usuario = {
        nomeOriginal: payload.nomeOriginal,
        addedby: payload.addedby,
        pago: payload.pago,
        pendente: payload.pendente
      }
      const id = payload.id
     // console.log(payload)
      firebase.database().ref('usuarios/' + id).set(usuario).then((data) => {
      //  console.log(data)
        commit('cadastraUsuario', {id: id, usuario: usuario})
      }).catch((error) => {
        console.log(error)
      })
    },
    cadastraMinhasApostas ({commit, getters}, payload) {
      var indexUsuario = this.state.loadedUsuarios.findIndex((usuario) => {
        return (usuario.email === store.getters.user.email)
      })
      var apostas = {grupos: payload.grupos, fases: payload.fases, usuarioid: this.state.loadedUsuarios[indexUsuario].id}
      firebase.database().ref('apostas/' + store.getters.user.id).set(apostas).then((data) => {
        const key = data.key
        commit('setMinhasApostas', {
          ...apostas,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    salvaApostas ({commit, getters}, payload) {
      firebase.database().ref('apostas').once('value')
        .then((data) => {
          const apostas = []
          const obj = data.val()
          for (let key in obj) {
            apostas[key] = {
              fases: obj[key].fases,
              grupos: obj[key].grupos,
              usuarioid: obj[key].usuarioid
            }
          }
          firebase.database().ref('apostasSalvas').set(apostas).then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.log(error)
          })
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    cadastraGabarito ({commit, getters}, payload) {
      var gabarito = {grupos: payload.grupos, fases: payload.fases, ultimojogoT1: payload.ultimojogoT1, ultimojogoT2: payload.ultimojogoT2, adminid: store.getters.user.id, ultimojogoT1gols: payload.ultimojogoT1gols, ultimojogoT2gols: payload.ultimojogoT2gols}
      firebase.database().ref('gabarito').set(gabarito).then((data) => {
        console.log(data)
        commit('setaGabarito', {
          ...gabarito
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createPartidasSegundaFase ({commit, getters}, payload) {
      const fases = payload
      fases.forEach(fase => {
        firebase.database().ref('fases').push(fase)
        .then((data) => {
          const key = data.key
          commit('createPartidasSegundaFase', {
            ...fase,
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
              email: payload.email
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
              email: payload.email
            }
           // console.log(newUser)
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
      commit('setUser', {id: payload.uid, email: payload.email})
     // console.log(this.state.user)
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
    loadedApostas (state) {
      return state.loadedApostas
    },
    loadedApostasSalvas (state) {
      return state.loadedApostasSalvas
    },
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedTimes (state) {
      return state.loadedTimes
    },
    loadedAdmins (state) {
      return state.loadedAdmins
    },
    loadedUsuarios (state) {
      return state.loadedUsuarios
    },
    loadedPartidas (state) {
      return state.loadedPartidas
    },
    loadedFases (state) {
      return state.loadedFases
    },
    loadedMinhasApostas (state) {
      return state.minhasApostas
    },
    loadedGabarito (state) {
      return state.gabarito
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
    loadedUsuario (state) {
      return (usuarioid) => {
       // console.log(state.loadedUsuarios)
        return state.loadedUsuarios.find((usuario) => {
          return usuario.id === usuarioid
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
