<template>
  <v-container grid-list-md text-xs-center>
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
        v-for="grupo in grupos"
        :key="grupo.l"
        :id="'grupo-' + grupo.l"
      >
      
        <!-- <h1 v-for="partida in grupo.partidas" :key="partida.id" >{{partida.time1nome}}</h1>-->

        <v-layout row align-items align-center  v-for="partida in grupo.partidas" :key="partida.id">
          <v-flex xs4 >
              <div class="text-xs-right"> {{partida.time1nome}}</div>
          </v-flex>
          <v-flex xs2 >
            <v-text-field
                    solo
                    name="input-1-3"
                    single-line
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <div class="text-xs-center">x</div>
            </v-flex>
            <v-flex xs2>
              <v-text-field
              solo
              name="input-1-2"
              single-line
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <div class="text-xs-left">{{partida.time2nome}}</div>
          </v-flex>
           
         </v-layout>
    

      
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
            <td class="text-xs-right">0</td>
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
        console.log(this.partidas)
        return [
          {l: 'A',
            times: this.times.filter(time => time.grupo === 'A'),
            partidas: this.partidas.filter(partida => partida.grupo === 'A')
          },
          {l: 'B',
            times: this.times.filter(time => time.grupo === 'B'),
            partidas: this.partidas.filter(partida => partida.grupo === 'B')
          },
          {l: 'C',
            times: this.times.filter(time => time.grupo === 'C'),
            partidas: this.partidas.filter(partida => partida.grupo === 'C')
          },
          {l: 'D',
            times: this.times.filter(time => time.grupo === 'D'),
            partidas: this.partidas.filter(partida => partida.grupo === 'D')
          },
          {l: 'E',
            times: this.times.filter(time => time.grupo === 'E'),
            partidas: this.partidas.filter(partida => partida.grupo === 'E')
          },
          {l: 'F',
            times: this.times.filter(time => time.grupo === 'F'),
            partidas: this.partidas.filter(partida => partida.grupo === 'F')
          },
          {l: 'G',
            times: this.times.filter(time => time.grupo === 'G'),
            partidas: this.partidas.filter(partida => partida.grupo === 'G')
          },
          {l: 'H',
            times: this.times.filter(time => time.grupo === 'H'),
            partidas: this.partidas.filter(partida => partida.grupo === 'H')
          }
        ]
      }
    }
  }
</script>
