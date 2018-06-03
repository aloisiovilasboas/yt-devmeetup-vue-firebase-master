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
          <tr class="mouseoverlink" >
            <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.index }}</router-link>
            </td>
            <td class="text-xs-left nomeusuarior ">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.nome }}</router-link>
            </td>
            <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.situacao }}</router-link>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</v-layout>
</template>

<script>
  export default {
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
        headers: [
          {text: 'Posição', value: 'index'},
          {text: 'Nome', value: 'nome'},
          {text: 'Situação', value: 'situacao'}
        ]
      }
    },
    computed: {
      users () {
        return this.$store.getters.loadedUsuarios
      },
      apostas () {
        return this.$store.getters.loadedApostas
      },
      usuariosPendentes () {
        var usuarios = this.users
        var index = 1
        var filtrados = []
        usuarios.forEach(user => {
          if (user.pendente) {
          } else {
            var indexAposta = this.apostas.findIndex((aposta) => {
              return aposta.usuarioid === user.id
            })
            if (indexAposta === -1) {
              user.situacao = 'Cadastrado'
            } else {
              user.situacao = 'Enviado'
              filtrados.push(user)
              user.index = index
              index++
            }
          }
        })
        return filtrados
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
    color: rgba(0,0,100,0.87);
    font-weight: bold;
}
/* table.table tbody td, .nomeusuarior {
  font-weight: 500;
} */

</style>
