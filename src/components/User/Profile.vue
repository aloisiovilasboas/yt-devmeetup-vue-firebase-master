<template>
  <v-container grid-list-md text-xs-center>
    <!--<v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 v-for="i in 2" :key="`6${i}`">
        <v-card dark color="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 v-for="i in 3" :key="`4${i}`">
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 4" :key="`3${i}`">
        <v-card dark color="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="i in 6" :key="`2${i}`">
        <v-card dark color="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 v-for="i in 12" :key="`1${i}`">
        <v-card dark color="secondary">
          <v-card-text class="px-0">1</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>-->


        
       

	<v-data-table
    	:headers="headers"
    	:items="items"
    	hide-actions
    	class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">
      <v-avatar :tile="true" >
          <img :src= "props.item.bandeira" alt="avatar">
        </v-avatar></td>	
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.pontos }}</td>
      <td class="text-xs-right">{{ props.item.vitorias }}</td>
      <td class="text-xs-right">{{ props.item.empates }}</td>
      <td class="text-xs-right">{{ props.item.derrotas }}</td>
      <td class="text-xs-right">{{ props.item.golsPro }}</td>
      <td class="text-xs-right">{{ props.item.golsContra }}</td>
      <td class="text-xs-right">{{ props.item.saldoGols }}</td>
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
          { text: 'P', value: 'pontos', sortable: false },
          { text: 'V', value: 'vitorias', sortable: false },
          { text: 'E', value: 'empates', sortable: false },
          { text: 'D', value: 'derrotas', sortable: false },
          { text: 'GP', value: 'golsPro', sortable: false },
          { text: 'GC', value: 'golsContra', sortable: false },
          { text: 'SG', value: 'saldoGols', sortable: false }
        ],
        items: [
          {
            value: false,
            bandeira: 'https://goo.gl/6omKBT',
            name: 'Arábia Saudita',
            pontos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0,
            saldoGols: 0
          },
          {
            value: false,
            bandeira: 'https://goo.gl/kg6Ynx',
            name: 'Egito',
            pontos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0,
            saldoGols: 0
          },
          {
            value: false,
            bandeira: 'http://geo5.net/imagens/Bandeira-da-Russia.png',
            name: 'Rússia',
            pontos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0,
            saldoGols: 0
          },
          {
            value: false,
            bandeira: 'https://goo.gl/4WecuL',
            name: 'Uruguai',
            pontos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0,
            saldoGols: 0
          }
        ]
      }
    }
  }
</script>
