<template>
  <v-container fluid grid-list-md text-xs-center>
<v-tabs
    dark
    color="cyan"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab
      v-for="grupo in grupos"
      :key="grupo.l"
      :href="'#grupo-' + grupo.l"
    >
      Grupo {{ grupo.l }}
    </v-tab>
    <v-tabs-items>
      <v-tab-item
        v-for="(grupo, indexG) in grupos"
        :key="grupo.l"
        :id="'grupo-' + grupo.l"
      >
      
        <!-- <h1 v-for="partida in grupo.partidas" :key="partida.id" >{{partida.time1nome}}</h1>-->

        <v-layout v-for="(partida, indexP) in grupo.partidas" :key="partida.id" column>
          <v-layout fluid wrap row align-items justify-center >
               <v-flex xs4 sm2 lg1 >
                 <v-layout row align-items align-center coluna1 justify-space-between>
                    <v-avatar :size="20" :tile="true">
                        <img :src="partida.time1.imgurl">
                    </v-avatar>
                    <div  class="text-xs-right"> {{partida.time1.sigla}}</div>
                    <v-layout class = "input1layout">
                          <v-text-field
                            v-model="partida.time1gols"
                            @change="update(1, indexG, indexP)"
                            class ="input1"
                            name="input-1-3"
                            single-line
                          ></v-text-field>
                    </v-layout>
                 </v-layout>
              </v-flex>
              <v-flex  xs2 md1 align-end justify-end align-content-end >
              <div class="xizinho"><p class="xizinho">x</p></div>
              </v-flex>
              <v-flex xs4 sm2 lg1>     
                 <v-layout row align-center reverse coluna1 justify-space-between>
                     <v-avatar :size="20" :tile="true">
                         <img :src="partida.time2.imgurl">
                     </v-avatar>
                    <div  class="text-xs-right"> {{partida.time2.sigla}}</div>
                    <v-layout class = "input1layout">
                          <v-text-field
                            class = "input1"
                            v-model="partida.time2gols"
                            @change="update(2, indexG, indexP)"
                            name="input-1-3"
                            type="number"
                            single-line
                          ></v-text-field>
                    </v-layout>
                 </v-layout>
            </v-flex>         
          </v-layout>
          <v-layout fluid wrap row align-items justify-center >
            <p class="hora">12/05/2018 - 14:00</p>
          </v-layout>
         </v-layout> 


         <h1>{{teste1}}</h1>   
        <v-data-table
        	:headers="headers"
        	:items="grupo.times"
         	hide-actions
        	class="elevation-1"
         >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">
                <v-avatar :tile="true" >
                  <img :src= "props.item.imgurl" alt="avatar">
                </v-avatar></td>	
            <td class="text-xs-center">{{props.item.nome }}</td>
            <td class="text-xs-right">{{teste1}}</td>
            <td class="text-xs-right">0</td>
            <td class="text-xs-right">0</td>
            <td class="text-xs-right">0</td>
            <td class="text-xs-right">0</td>
            <td class="text-xs-right">0</td>
            <td class="text-xs-right">0</td>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        inputsGrupos: [],
        teste1: '',
        headers: [
          {text: '', value: 'bandeira', align: 'center', sortable: false},
          {text: 'Times', value: 'name', align: 'center', sortable: false},
          { text: 'P', value: 'pontos', align: 'right', sortable: false },
          { text: 'V', value: 'vitorias', align: 'right', sortable: false },
          { text: 'E', value: 'empates', align: 'right', sortable: false },
          { text: 'D', value: 'derrotas', align: 'right', sortable: false },
          { text: 'GP', value: 'golsPro', align: 'right', sortable: false },
          { text: 'GC', value: 'golsContra', align: 'right', sortable: false },
          { text: 'SG', value: 'saldoGols', align: 'right', sortable: false }
        ]
      }
    },
    computed: {
      times () {
        return this.$store.getters.loadedTimes
      },
      partidas () {
        return this.$store.getters.loadedPartidas
      },
      grupos () {
        var times = this.times
        function removerAcentos (s) {
          return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        times.forEach(time => {
          var sigla = removerAcentos(time.nome.slice(0, 3).toUpperCase())
         // console.log(sigla)
          time.sigla = sigla
        })
        var partidas = this.partidas
        var letras = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]
        var gruposOrganizados = []
        letras.forEach(letra => {
          var partidasGrupo = partidas.filter(partida => partida.grupo === letra)
          var timesGrupo = times.filter(time => time.grupo === letra)
          partidasGrupo.forEach(partida => {
            var time1 = null
            var time2 = null
            timesGrupo.forEach(time => {
              if (partida.time1id === time.id) {
                time1 = time
              } else if (partida.time2id === time.id) {
                time2 = time
              }
            })
            partida.time1 = time1
            partida.time2 = time2
            partida.time1gols = null
            partida.time2gols = null
          })
          gruposOrganizados.push({l: letra,
            times: timesGrupo,
            partidas: partidasGrupo
          })
          this.inputsGrupos.push({l: letra,
            times: timesGrupo,
            partidas: partidasGrupo
          })
        })
        this.gruposOrganizados = gruposOrganizados
        return gruposOrganizados
      }
    },
    methods: {
      update (numTime, indexG, indexP) {
        console.log(this.grupos)
        console.log(numTime)
        console.log('indexg:' + indexG)
        console.log('indexp: ' + indexP)
        // this.teste1 = data1 + data2
      }
    }
  }
</script>

<style>
.coluna1{
  align-items: flex-center;
}
.input1layout{
  max-width: 10px;
}
.input2{
  font-size: 8px;
}
.xizinho{
  height: 100%;
}
.container.grid-list-md .layout .flex {
    padding: 0px;
}
.input-group {
    padding-top: 20px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}
.input-group--text-field input, .input-group--text-field textarea{
    font-size: 14px;
}
p.xizinho {
    margin-bottom: 0px;
    padding-top: 1.4em;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 1em;
}
p.hora {
    font-size: 10px;
    font-weight: 400;

}

</style>
