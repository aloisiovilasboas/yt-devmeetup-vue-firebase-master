<template>
  <div>
  	<v-btn  :to="'/CreateGrupo'">
                    <v-icon left light>arrow_forward</v-icon>
                    Add Grupo
                  </v-btn>
    <v-btn  v-on:click="geraPartidas">
                    <v-icon left light>arrow_forward</v-icon>
                    Gera Partidas
                  </v-btn>
  </div>
</template>

<script>
  export default {
    methods: {
      geraPartidas () {
        var times = this.$store.getters.loadedTimes
        var grupos = [
          {l: 'A', times: times.filter(time => time.grupo === 'A')},
          {l: 'B', times: times.filter(time => time.grupo === 'B')},
          {l: 'C', times: times.filter(time => time.grupo === 'C')},
          {l: 'D', times: times.filter(time => time.grupo === 'D')},
          {l: 'E', times: times.filter(time => time.grupo === 'E')},
          {l: 'F', times: times.filter(time => time.grupo === 'F')},
          {l: 'G', times: times.filter(time => time.grupo === 'G')},
          {l: 'H', times: times.filter(time => time.grupo === 'H')}
        ]
        var todasAsPartidas = []
        grupos.forEach(grupo => {
          todasAsPartidas.push({grupo: grupo.l, time1nome: grupo.times[2].nome, time1id: grupo.times[2].id, time2id: grupo.times[3].id, time2nome: grupo.times[3].nome})
          todasAsPartidas.push({grupo: grupo.l, time1nome: grupo.times[0].nome, time1id: grupo.times[0].id, time2id: grupo.times[1].id, time2nome: grupo.times[1].nome})
          todasAsPartidas.push({grupo: grupo.l, time1nome: grupo.times[0].nome, time1id: grupo.times[0].id, time2id: grupo.times[2].id, time2nome: grupo.times[2].nome})
          todasAsPartidas.push({grupo: grupo.l, time1nome: grupo.times[1].nome, time1id: grupo.times[1].id, time2id: grupo.times[3].id, time2nome: grupo.times[3].nome})
          todasAsPartidas.push({grupo: grupo.l, time1nome: grupo.times[0].nome, time1id: grupo.times[0].id, time2id: grupo.times[3].id, time2nome: grupo.times[3].nome})
          todasAsPartidas.push({grupo: grupo.l, time1nome: grupo.times[1].nome, time1id: grupo.times[1].id, time2id: grupo.times[2].id, time2nome: grupo.times[2].nome})
        })
        console.log(todasAsPartidas)
        this.$store.dispatch('createPartidas', todasAsPartidas)
        this.$router.push('/profile')
      }
    }
  }
</script>
