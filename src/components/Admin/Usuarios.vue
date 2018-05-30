<template>
<v-layout column wrap fluid>
<v-flex xs5 offset-xs2>
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
    </template>
  </v-data-table>
</v-flex>
<span style="display: inline-block; margin-top: 50px;" > </span>
<v-flex xs5 offset-xs2>

  <v-layout row>
    <div> Usuários Pendentes: </div> <div> <b>{{nroPendentes}}</b></div> 
  </v-layout>
    <v-layout row>
    <div> Usuários Cadastrados: </div> <div><b>{{nroCadastrados}}</b></div> 
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
</template>

<script>
  export default {
    data () {
      return {
        novoUsuario: '',
        grupo: '',
        nroPendentes: 0,
        nroCadastrados: 0,
        headers: [
          {text: 'Nº', value: 'index'},
          {text: 'Nome Original', value: 'nomeOriginal'},
          {text: 'Nome', value: 'nome'},
          {text: 'Link/e-mail', value: 'link'},
          {text: 'Situação', value: 'situacao'}
        ]
      }
    },
    computed: {
      users () {
        return this.$store.getters.loadedUsuarios
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
            this.nroCadastrados++
            user.situacao = 'Cadastrado'
            user.link = user.email
          }
          user.index = index
          index++
        })
        return usuarios
      }
    },
    methods: {
      onCreateUsuario () {
        this.$store.dispatch('createUsuario', this.novoUsuario)
        this.$router.push('/Usuarios')
      }
    }
  }
</script>
