<template>
<v-layout column wrap fluid>
<v-flex xs5 offset-xs2>
 <v-data-table
    :headers="headers"
    :items="usuariosCadastrados"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.nome }}</td>
      <td class="text-xs-left">{{ props.item.link }}</td>
      <td class="text-xs-left">{{ props.item.id }}</td>
    </template>
  </v-data-table>
</v-flex>
<span style="display: inline-block; margin-top: 50px;" > </span>
<v-flex xs5 offset-xs2>
  
  <v-layout row>
    
                  <v-text-field
                  label="novo usuario"
                    v-model="novoUsuario"
                  ></v-text-field>
  </v-layout>
                  <v-btn  v-on:click="onCreateUsuario">
                    <v-icon left light>arrow_forward</v-icon>
                    Adiciona Usuario
                  </v-btn> -->

</v-flex>
</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        novoUsuario: '',
        grupo: '',
        headers: [
          {text: 'nome', value: 'nome'},
          {text: 'link', value: 'link'},
          {text: 'id', value: 'id'}
        ],
        usuarios: [
          {
            nome: 'joao',
            id: 'asfadsfasdfasfd',
            link: 'fsdfsdf'
          },
          {
            nome: 'joao',
            id: 'asfadsfasdfasfd',
            link: 'fsdfsdf'
          }
        ]
      }
    },
    computed: {
      usuariosCadastrados () {
        var users = this.$store.getters.loadedUsuarios
        users.forEach(user => {
          user.link = 'globo.com'
        })
        return users
      },
      usuariosPendentes () {
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
