<template>
  <div>
  	<v-btn  :to="'/CreateGrupo'">
                    <v-icon left light>arrow_forward</v-icon>
                    Add Grupo
                  </v-btn>
                  <v-btn  v-on:click="geraSiglas">
                    <v-icon left light>arrow_forward</v-icon>
                    Gera Siglas
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
      geraSiglas () {
        function removerAcentos (s) {
          return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        var times = this.$store.getters.loadedTimes
        times.forEach(time => {
          var sigla = removerAcentos(time.nome.slice(0, 3).toUpperCase())
          console.log(sigla)
          time.sigla = sigla
        })
      },
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
          todasAsPartidas.push({grupo: grupo.l, time1id: grupo.times[2].id, time2id: grupo.times[3].id})
          todasAsPartidas.push({grupo: grupo.l, time1id: grupo.times[0].id, time2id: grupo.times[1].id})
          todasAsPartidas.push({grupo: grupo.l, time1id: grupo.times[0].id, time2id: grupo.times[2].id})
          todasAsPartidas.push({grupo: grupo.l, time1id: grupo.times[1].id, time2id: grupo.times[3].id})
          todasAsPartidas.push({grupo: grupo.l, time1id: grupo.times[0].id, time2id: grupo.times[3].id})
          todasAsPartidas.push({grupo: grupo.l, time1id: grupo.times[1].id, time2id: grupo.times[2].id})
        })
        console.log(todasAsPartidas)
        this.$store.dispatch('createPartidas', todasAsPartidas)
        this.$router.push('/profile')
      }
    }
  }
</script>
