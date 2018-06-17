<template>
<v-container v-if = "jogadores !== undefined && jogadores.length !== 0 && gabarito !== null && gabarito !== undefined" fluid grid-list-md text-xs-center :id="'container'">
<v-layout column >
  <v-layout column >
    <v-flex xs12 >
      <div>
      <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
      <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-4" class="white--text">
              <v-container fluid grid-list-lg>
             
                <div class="headline">Último jogo</div>
              </v-container>
              <v-container fluid grid-list-lg>
      <div>
       <v-layout fluid wrap row align-items justify-center >
               <v-flex xs4 sm2 lg1 >
                 <v-layout row align-items align-center coluna1 justify-space-between>
                    <v-avatar :size="40" :tile="true">
                        <img :src="ultimoJogot1.imgurl">
                    </v-avatar>
                    <div  class="text-xs-right subheading"> {{ultimoJogot1.sigla}}</div>
                    <div  class="text-xs-right subheading"> {{ultimoJogoT1gols}}</div>
                 </v-layout>
              </v-flex>
              <v-flex  xs2 md1 align-end justify-end align-content-end >
              <div ><p>x</p></div>
              </v-flex>
              <v-flex xs4 sm2 lg1>     
                 <v-layout row align-center reverse coluna1 justify-space-between>
                     <v-avatar :size="40" :tile="true">
                         <img :src="ultimoJogot2.imgurl">
                     </v-avatar>
                    <div  class="text-xs-right subheading"> {{ultimoJogot2.sigla}}</div>
                    <div  class="text-xs-right subheading"> {{ultimoJogoT2gols}}</div>
                 </v-layout>
            </v-flex>         
          </v-layout>
    </div>
             
              </v-container>
            </v-card>        
          </v-flex>
      </v-layout>
      </v-container>
      </v-card>

      <v-btn :to="'/Resultados'" round color="primary" dark>Resultados dos Jogos</v-btn>

      
    </div>
    </v-flex>
  <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
    <v-flex xs12 >
    <v-data-table
        :headers="headers"
        :items="jogadores"
        :pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr class="mouseoverlink" >
       <!--     <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.i }}</router-link>
            </td> -->
            <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.pos }}</router-link>
            </td>
            <td class="text-xs-left nomeusuarior ">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.nome }}</router-link>
            </td>
            <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.pontuacao }}</router-link>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
      </v-container>
  </v-card>
  </v-layout>
</v-layout>
</v-container>
<v-container v-else>
    <div class = "text-xs-center"> <v-progress-circular :size="50" indeterminate color="red"></v-progress-circular></div>
  </v-container>
</template>

<script>
  export default {
    beforeCreate () {
      if (this.$store.getters.loadedApostasSalvas === undefined || this.$store.getters.loadedApostasSalvas.length === 0) {
        this.$store.dispatch('loadApostasSalvas')
      }
      if (this.$store.getters.loadedUsuarios === undefined || this.$store.getters.loadedUsuarios.length === 0) {
        this.$store.dispatch('loadUsuarios')
      }
      if (this.$store.getters.loadedGabarito === undefined || this.$store.getters.loadedGabarito === null) {
        this.$store.dispatch('loadGabarito')
      }
      if (this.$store.getters.loadedTimes === undefined || this.$store.getters.loadedTimes.length === 0) {
        this.$store.dispatch('loadTimes')
      }
      // var ap = this.$store.getters.loadedMinhasApostas
      //  console.log('ap')
      //  console.log(ap.fases)
      //  console.log(ap.grupos)
    },
    data () {
      return {
       /*  adminsHardCoded: [
          {id: 'mDriYC0MQ2f8O23o4zDRWqxvmAO2', nome: 'Aloísio'},
          {id: '0VHPWAJJGbgOWtSG6yv31BDwPSs1', nome: 'Maiara'},
          {id: 'MI8UmWIIhbMJE4NH1hhLYqp3N6J2', nome: 'Marcelinho'},
          {id: 'hA0Ahiin6CY6QpjI15vyjwJdMID2', nome: 'Jorginho'},
          {id: '04DLvyULzhg04d6NXtsPw227CUQ2', nome: 'Marcel'}
        ], */
        novoUsuario: '',
        grupo: '',
        nroPendentes: 0,
        nroCadastrados: 0,
        nroEnviados: 0,
        nroPagos: 0,
        pagination: {'sortBy': 'i', 'rowsPerPage': -1},
        headers: [
        //  {text: 'Nº', value: 'i'},
          {text: 'Posição', value: 'pos'},
          {text: 'Nome', value: 'nome'},
          {text: 'Pontos', value: 'pontuacao'}
         // {text: 'Situação', value: 'situacao'}
        ]
      }
    },
    methods: {
      toTitleCase (str) {
        var s = str.replace(
          /([^\W_]+[^\s-]*) */g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          }
        )
        return s.replace(/De |Da |Das |Dos /gi, function (x) {
          return x.toLowerCase()
        })
      },
      calculaPontuacaoGrupo (partidaJogador, partidaGabarito) {
        var pontuacao = 0
        var jogador = Number(partidaJogador.time1gols) - Number(partidaJogador.time2gols)
        var gabarito = Number(partidaGabarito.time1gols) - Number(partidaGabarito.time2gols)
        if ((jogador > 0 && gabarito > 0) || (jogador < 0 && gabarito < 0) || (jogador === 0 && gabarito === 0)) {
          if (Number(partidaJogador.time1gols) === Number(partidaGabarito.time1gols) && Number(partidaJogador.time2gols) === Number(partidaGabarito.time2gols)) {
            pontuacao = 5
          } else {
            pontuacao = 1
          }
        }
        return pontuacao
      },
      calculaPontuacao (jogadores) {
        jogadores.sort(function (jogadorA, jogadorB) {
          if (jogadorB.pontuacao - jogadorA.pontuacao === 0) {
            var nameA = jogadorA.nome // ignore upper and lowercase
            var nameB = jogadorB.nome // ignore upper and lowercase
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          } else {
            return jogadorB.pontuacao - jogadorA.pontuacao
          }
        })
        var pos = 1
        var i = 0
        var pontuacaoanterior = 0
        var inicio = true
        jogadores.forEach(jogador => {
          i++
          if (inicio) {
            pontuacaoanterior = jogador.pontuacao
            inicio = false
          } else {
            if (jogador.pontuacao < pontuacaoanterior) {
              pos = i
              pontuacaoanterior = jogador.pontuacao
            }
          }
          jogador.i = i
          jogador.pos = pos
        })
       // var posicao = 1
       // jogadores[0].pos = 1
        /* for (let i = 1; i < jogadores.length; i++) {
          if (jogadores[i].pontuacao === jogadores[i - 1].pontuacao) {
            jogadores[i].pos = posicao
          } else {
            jogadores[i].pos = i + 1
          }
        } */
      }
    },
    computed: {
      times () {
        var times = this.$store.getters.loadedTimes
        function removerAcentos (s) {
          return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        times.forEach(time => {
          var sigla = removerAcentos(time.nome.slice(0, 3).toUpperCase())
         // console.log(sigla)
          time.sigla = sigla
        })
        return times
      },
      ultimoJogot1 () {
        var it = this.times.findIndex((t1) => {
          return t1.id === this.gabarito.ultimojogoT1
        })
        if (it === -1) {
          return {nome: '', imgurl: ''}
        } else {
          return this.times[it]
        }
      },
      ultimoJogot2 () {
        var it = this.times.findIndex((t2) => {
          return t2.id === this.gabarito.ultimojogoT2
        })
        if (it === -1) {
          return {nome: '', imgurl: ''}
        } else {
          return this.times[it]
        }
      },
      ultimoJogoT1gols () {
        return this.gabarito.ultimojogoT1gols
      },
      ultimoJogoT2gols () {
        return this.gabarito.ultimojogoT2gols
      },
      users () {
        return this.$store.getters.loadedUsuarios
      },
      apostas () {
        return this.$store.getters.loadedApostas
      },
      gabarito () {
        return this.$store.getters.loadedGabarito
      },
      apostasSalvas () {
        return this.$store.getters.loadedApostasSalvas
      },
      jogadores () {
       // console.log('gabarito')
       // console.log(this.$store.getters.gabarito)
        var usuarios = this.users
        var index = 1
        var filtrados = []
        usuarios.forEach(user => {
          if (!user.pendente && user.pago) {
            var indexAposta = this.apostasSalvas.findIndex((aposta) => {
              return aposta.usuarioid === user.id
            })
            if (indexAposta !== -1) {
              user.apostas = this.apostasSalvas[indexAposta]
              if (user.nome.indexOf(' ') === -1) {
                user.nome = user.nomeOriginal
              }
              user.nome = this.toTitleCase(user.nome)
              user.situacao = 'Enviado'
              filtrados.push(user)
              user.index = index
              index++
            }
          }
        })
        if (this.gabarito !== undefined && this.gabarito !== null) {
          filtrados.forEach(jogador => {
            var pontos = 0
            for (let i = 0; i < this.gabarito.grupos.length; i++) {
              for (let j = 0; j < this.gabarito.grupos[j].partidas.length; j++) {
               // console.log(this.gabarito.grupos[i].partidas[j])
                if (this.gabarito.grupos[i].partidas[j].time1gols !== null && this.gabarito.grupos[i].partidas[j].time1gols !== undefined) {
                //  console.log(jogador.apostas.grupos[i].partidas[j])
                // console.log(jogador.nome)
                // console.log(jogador.apostas.grupos[i].partidas[j])
                // console.log('gabarito')
                // console.log(this.gabarito.grupos[i].partidas[j])
                  var ipart = jogador.apostas.grupos[i].partidas.findIndex((partida) => {
                    return partida.id === this.gabarito.grupos[i].partidas[j].id
                  })
                  var pontosPartida = this.calculaPontuacaoGrupo(jogador.apostas.grupos[i].partidas[ipart], this.gabarito.grupos[i].partidas[j])
                  pontos += pontosPartida
                }
              }
            }
            jogador.pontuacao = pontos
          })
          this.calculaPontuacao(filtrados)
          this.pagination.sortBy = 'i'
         // console.log(filtrados)
          return filtrados
        } else {
          return filtrados
        }
      }
    }
  }
</script>

<style>
a:link {
    text-decoration: none;
}
.mouseoverlink { 
  cursor: pointer; 
}
.table, .nomeusuarior, .application .theme--light.table {
    font-weight: bold;
}
/* table.table tbody td, .nomeusuarior {
  color: rgba(0,0,100,0.87);
  font-weight: 500;
} */

</style>
