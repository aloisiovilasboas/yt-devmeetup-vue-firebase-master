<template class="apostas">
  <v-container fluid grid-list-md class="apostas">
        <v-list class="apostas" >
          <template v-for="(partida, index) in partidas" class="">
            <v-layout row wrap  align-items align-center  class="">
              <v-flex xs5 center>
                <div class="text-xs-right" >{{partida.time1}}</div>
              </v-flex>
                <v-flex xs1>
                  <v-text-field solo></v-text-field>
                </v-flex>
                  <div> x </div>
                <v-flex xs1>
                  <v-text-field solo ></v-text-field>
                </v-flex>
              <v-flex xs4>
                <div class="text-xs-left">{{partida.time2}}</div>
              </v-flex>         
            </v-layout  >
            <p class = "text-xs-center "> {{partida.hora}}</p>
          </template>
        </v-list>

        <form >
  First name:<br>
  <input type="text" name="firstname" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br><br>
  <input type="submit" value="Submit">
</form>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        partidas: [
          { time1: 'Russiaaaa', time2: 'Arabia', hora: '12/12/12 4:23' },
          { time1: 'Russia', time2: 'Arabia', hora: '12/12/12 4:23' },
          { time1: 'Russia', time2: 'Arabia', hora: '12/12/12 4:23' },
          { time1: 'Russia', time2: 'Arabia', hora: '12/12/12 4:23' },
          { time1: 'Russia', time2: 'Arabia', hora: '12/12/12 4:23' }
        ]
      }
    }
  }
</script>
<style>
  .apostas {
  background-color: white;
}
</style>
