<template>
  <v-container fluid grid-list-md>
    
    <v-text-field
      v-model="teste2"
      type="number"
      class ="input1"
      name="input-1-3"
      single-line
    ></v-text-field>
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
      <td class="text-xs-right">{{teste2}}</td>
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
    data: () => ({
      teste2: 7,
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
    }),
    computed: {
      times () {
        return this.$store.getters.loadedTimes.filter(time => time.grupo === 'A')
      }
    }
  }
</script>
