<template>
<v-container v-if = "jogadores !== undefined && jogadores.length !== 0" >
<v-layout column >
  <v-layout>
    <v-flex xs10 offset-xs1 >
    <v-data-table
        :headers="headers"
        :items="jogadores"
       
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr class="mouseoverlink" >
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
        pagination: {'sortBy': 'pontuacao', 'rowsPerPage': -1},
        headers: [
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
      calculaPosicoes (jogadores) {
        jogadores.sort(function (jogadorA, jogadorB) {
          return jogadorB.pontuacao - jogadorA.pontuacao
        })
        var i = 1
        jogadores.forEach(jogador => {
          jogador.pos = i
          i++
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
        console.log(this.$store.getters.gabarito)
        var usuarios = this.users
        var index = 1
        var filtrados = []
        usuarios.forEach(user => {
          if (!user.pendente && user.pago) {
            var indexAposta = this.apostas.findIndex((aposta) => {
              return aposta.usuarioid === user.id
            })
            if (indexAposta !== -1) {
              user.apostas = this.apostas[indexAposta]
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
                  var pontosPartida = this.calculaPontuacaoGrupo(jogador.apostas.grupos[i].partidas[j], this.gabarito.grupos[i].partidas[j])
                  pontos += pontosPartida
                }
              }
            }
            jogador.pontuacao = pontos
          })
          this.calculaPosicoes(filtrados)
         // this.pagination.sortBy = 'pos'
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
