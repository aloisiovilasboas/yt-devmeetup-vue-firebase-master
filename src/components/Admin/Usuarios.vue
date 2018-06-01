<template>
<v-layout column >
  <v-layout>
    <v-flex xs10 offset-xs1 >
    <v-data-table
        :headers="headers"
        :items="usuariosPendentes"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.index }}</td>
          <td class="text-xs-left">{{ props.item.nomeOriginal }}</td>
          <td class="text-xs-left">{{ props.item.nome }}</td>
          <td class="text-xs-left">{{ props.item.link }}</td>
          <td class="text-xs-left">{{ props.item.situacao }}</td>
          <td class="text-xs-left">
           <!-- <v-checkbox
              v-model="props.item.pago"
              @click="updatePago(props.item)"
            ></v-checkbox>
            -->
            <input type="checkbox"
             v-model="props.item.pago"
             :disabled="props.item.disabled"
              @change="updatePago(props.item)"
            >
          </td>
          <td class="text-xs-left">{{ props.item.adicionadopor }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
<span style="display: inline-block; margin-top: 50px;" > </span>
<v-layout>
<v-flex xs10 offset-xs1>

  <v-layout row>
    <div> Usuários Pendentes: </div> <div> <b>{{nroPendentes}}</b></div> 
  </v-layout>
    <v-layout row>
    <div> Usuários Cadastrados: </div> <div><b>{{nroCadastrados}}</b></div> 
  </v-layout>
  <v-layout row>
    <div> Usuários com apostas enviadas: </div> <div><b>{{nroEnviados}}</b></div> 
  </v-layout>
  
  <v-layout row>
    
                  <v-text-field
                  label="novo usuario"
                    v-model="novoUsuario"
                  ></v-text-field>
  </v-layout>
                  <v-btn  v-on:click="onCreateUsuario">
                    <v-icon left light>arrow_forward</v-icon>
                    Adiciona Usuario
                  </v-btn>
</v-flex>
</v-layout>
</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        adminsHardCoded: [
          {id: 'mDriYC0MQ2f8O23o4zDRWqxvmAO2', nome: 'Aloísio'},
          {id: '0VHPWAJJGbgOWtSG6yv31BDwPSs1', nome: 'Maiara'},
          {id: 'MI8UmWIIhbMJE4NH1hhLYqp3N6J2', nome: 'Marcelinho'},
          {id: 'hA0Ahiin6CY6QpjI15vyjwJdMID2', nome: 'Jorginho'},
          {id: '04DLvyULzhg04d6NXtsPw227CUQ2', nome: 'Marcel'}
        ],
        novoUsuario: '',
        grupo: '',
        nroPendentes: 0,
        nroCadastrados: 0,
        nroEnviados: 0,
        headers: [
          {text: 'Nº', value: 'index'},
          {text: 'Nome Original', value: 'nomeOriginal'},
          {text: 'Nome', value: 'nome'},
          {text: 'Link/e-mail', value: 'link'},
          {text: 'Situação', value: 'situacao'},
          {text: 'Pago', value: 'pago'},
          {text: 'Adicionado por', value: 'adicionadopor'}
        ]
      }
    },
    computed: {
      users () {
        return this.$store.getters.loadedUsuarios
      },
      pagamentos () {
        return false
      },
      apostas () {
        return this.$store.getters.loadedApostas
      },
      usuarioLogado () {
        return this.$store.getters.user
      },
      usuariosCadastrados () {
      },
      admins () {
        return this.$store.getters.loadedAdmins
      },
      usuariosPendentes () {
        var usuarios = this.users
      //  var admins = this.admins
        usuarios.filter(user => user.pendente === 'true')
        var index = 1
        usuarios.forEach(user => {
          if (user.pendente) {
            this.nroPendentes++
            user.situacao = 'Pendente'
            user.link = 'http://bolaoafc2018.firebaseapp.com/cadastre/' + user.id
          } else {
            var indexAposta = this.apostas.findIndex((aposta) => {
              return aposta.usuarioid === user.id
            })
            if (indexAposta === -1) {
              user.situacao = 'Cadastrado'
              this.nroCadastrados++
            } else {
              user.situacao = 'Enviado'
              this.nroEnviados++
            }
            user.link = user.email
          }
          user.index = index
          if (user.addedby === this.usuarioLogado.id) {
            user.disabled = false
          } else {
            user.disabled = true
          }
          var indexAdmin = this.adminsHardCoded.findIndex((admin) => {
            return admin.id === user.addedby
          })
          if (this.adminsHardCoded[indexAdmin] !== null && this.adminsHardCoded[indexAdmin] !== undefined) {
            user.adicionadopor = this.adminsHardCoded[indexAdmin].nome
          }
          index++
        })
        return usuarios
      }
    },
    methods: {
      updatePago (usuario) {
       // usuario.pago = !usuario.pago
        console.log(usuario.pago + ' ' + usuario.nomeOriginal)
        if (usuario.pendente) {
          this.$store.dispatch('cadastraPagamentoDePendente', {
            id: usuario.id,
            nomeOriginal: usuario.nomeOriginal,
            addedby: usuario.addedby,
            pendente: usuario.pendente,
            pago: usuario.pago
          })
        } else {
          this.$store.dispatch('cadastraPagamentoDeCadastrado', {
            id: usuario.id,
            nomeOriginal: usuario.nomeOriginal,
            addedby: usuario.addedby,
            nome: usuario.nome,
            email: usuario.email,
            pendente: usuario.pendente,
            pago: usuario.pago
          })
        }
      },
      onCreateUsuario () {
        this.$store.dispatch('createUsuario', this.novoUsuario)
        this.$router.push('/Usuarios')
      },
      setaNaoPagos () {
        this.users.forEach(usuario => {
          if (usuario.pendente) {
            this.$store.dispatch('cadastraPagamentoDePendente', {
              id: usuario.id,
              nomeOriginal: usuario.nomeOriginal,
              addedby: usuario.addedby,
              pendente: usuario.pendente,
              pago: false
            })
          } else {
            this.$store.dispatch('cadastraPagamentoDeCadastrado', {
              id: usuario.id,
              nomeOriginal: usuario.nomeOriginal,
              addedby: usuario.addedby,
              nome: usuario.nome,
              email: usuario.email,
              pendente: usuario.pendente,
              pago: false
            })
          }
        })
      }
    }
  }
</script>
