<template>
  <v-container grid-list-md text-xs-center>
    
	<v-data-table
    	:headers="headers"
    	:items="times"
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
      }
    }
  }
</script>
