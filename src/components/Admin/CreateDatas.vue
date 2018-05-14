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
    <v-tab
      :key="oitavas"
      :href="'#oitavas'"
    >
      Oitavas
    </v-tab>
    <v-tabs-items>
      <v-tab-item
        v-for="(grupo, indexG) in grupos"
        :key="grupo.l"
        :id="'grupo-' + grupo.l">
      
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
                            type="number"
                            class ="input1"
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
                            type="number"
                            v-model="partida.time2gols"
                            @change="update(2, indexG, indexP)"
                            :pagination.sync="pagination"
                            hide-actions
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

         <h1>{{ligacaop}}</h1>   

        <v-data-table
        	:headers="headers"
        	:items="grupo.times"
          :pagination.sync="pagination"
          :hide-actions="true"
          class="elevation-1"
          item-key="bandeira"
         >
          <template slot="items" slot-scope="props">
              <td class="text-xs-right"  :id ="'pos'+ props.item.pos" >{{props.item.pos}}</td>
              <td class="text-xs-center">
                <v-avatar :tile="true" >
                  <img :src= "props.item.imgurl" alt="avatar">
                </v-avatar></td>	
              <td class="text-xs-center">{{props.item.nome }}</td>
              <td class="text-xs-right">{{props.item.p}}</td>
              <td class="text-xs-right">{{props.item.v}}</td>
              <td class="text-xs-right">{{props.item.e}}</td>
              <td class="text-xs-right">{{props.item.d}}</td>
              <td class="text-xs-right">{{props.item.gp}}</td>
              <td class="text-xs-right">{{props.item.gc}}</td>
              <td class="text-xs-right">{{props.item.sg}}</td>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item :key="oitavas"
        :id="'oitavas'">
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-radio-group v-model="ex7" column>
                    <v-layout row wrap >
                      <v-flex xs1 >
                        <v-avatar class="avatarflex" :size="24" :tile="true">
                          <img :src="primeiroA.imgurl">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs7 >
                        <v-radio
                          :label="primeiroA.nome"
                          color="orange darken-3"
                          :value="primeiroA"
                        ></v-radio>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap >
                      <v-flex xs1 >
                        <v-avatar class="avatarflex" :size="24" :tile="true">
                          <img :src="primeiroA.imgurl">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs7 >
                        <v-radio
                          :label="primeiroA"
                          color="orange darken-3"
                          :value="primeiroA"
                        ></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex7: 'red',
        ex8: 'primary',
        primeiroA: {nome: '1a'},
        oitavas: null,
        pagination: {'sortBy': 'pos', 'rowsPerPage': -1},
        ligacaop: 0,
        headers: [
          {text: ' ', value: 'pos', align: 'center', sortable: false},
          {text: '', value: 'bandeira', align: 'center', sortable: false},
          {text: 'Times', value: 'nome', align: 'center', sortable: false},
          { text: 'P', value: 'p', align: 'right', sortable: false },
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
          var posicao = 1
          timesGrupo.forEach(time => {
            time.pos = posicao
            posicao++
          })
          partidasGrupo.forEach(partida => {
            var time1 = null
            var time2 = null
            timesGrupo.forEach(time => {
              time.p = 0
              time.v = 0
              time.e = 0
              time.d = 0
              time.gp = 0
              time.gc = 0
              time.sg = 0
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
        })
        this.gruposOrganizados = gruposOrganizados
        return gruposOrganizados
      }
    },
    methods: {
      calculaPontuacao (time, grupo) {
        // time.dados = {p: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0}
        time.p = 0
        time.v = 0
        time.e = 0
        time.d = 0
        time.gp = 0
        time.gc = 0
        time.sg = 0
        grupo.partidas.forEach(partida => {
          if (partida.time1gols !== null && partida.time2gols !== null) {
            if (time.id === partida.time1.id) {
              time.gp += Number(partida.time1gols)
              time.gc += Number(partida.time2gols)
              if (partida.time1gols > partida.time2gols) {
                time.p += 3
                time.v += 1
              } else if (partida.time1gols === partida.time2gols) {
                time.p += 1
                time.e += 1
              } else {
                time.d += 1
              }
            } else if (time.id === partida.time2.id) {
              time.gp += Number(partida.time2gols)
              time.gc += Number(partida.time1gols)
              if (partida.time1gols < partida.time2gols) {
                time.p += 3
                time.v += 1
              } else if (partida.time1gols === partida.time2gols) {
                time.p += 1
                time.e += 1
              } else {
                time.d += 1
              }
            }
          }
        })
        time.sg = Number(time.gp) - Number(time.gc)
      },
      calculaPosicoes (grupo) {
        grupo.times.sort(function (timea, timeb) {
         // console.log(timea.p - timeb.p)
          if (timeb.p - timea.p !== 0) {
            return timeb.p - timea.p
          } else {
            if (timeb.sg - timea.sg !== 0) {
              return timeb.sg - timea.sg
            } else {
              return timeb.gp - timea.gp
            }
          }
        })
        var posicao = 1
        grupo.times.forEach(time => {
          time.pos = posicao
          posicao++
          console.log(time.sigla)
        })
        this.primeiroA = grupo.times[0]
      },
      update (numTime, indexG, indexP) {
       // console.log(numTime)
       // console.log('indexg:' + indexG)
       // console.log('indexp: ' + indexP)
        var grupo = this.grupos[indexG]
       // console.log(grupo)
        var partida = grupo.partidas[indexP]
        var time1 = partida.time1
       // console.log(time1)
        var time2 = partida.time2
       // console.log(time2)
        var b1 = (numTime === 1 && (partida.time2gols !== null || partida.time1gols === null))
        var b2 = (numTime === 2 && (partida.time1gols !== null || partida.time2gols === null))
        if (b1 || b2) {
          this.calculaPontuacao(time1, grupo)
          this.calculaPontuacao(time2, grupo)
          this.calculaPosicoes(grupo)
          this.pagination.sortBy = 'name'
          this.pagination.sortBy = 'pos'
          this.ligacaop += 1
        }
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
h1 {
  font-size: 0%
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
    padding-top: 0px;
    padding-right: 12px;
    padding-bottom: 0px;
    padding-left: 12px;
}
#pos1 {
  color: blue;
  font-weight: 600;

}
#pos2 {
  color: blue;
  font-weight: 600;
}
.avatarflex{
  padding-top: 0.4em;
  padding-bottom: 0.0em;
}

</style>
