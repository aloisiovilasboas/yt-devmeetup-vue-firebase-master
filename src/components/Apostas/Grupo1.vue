<template>
  <v-container>
    <v-layout row wrap v-for="time in times" :key="time.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="time.imgurl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ time.nome }}</h5>
                    <div>{{time.grupo }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      times () {
        return this.$store.getters.loadedTimes
      }
    }
  }
</script>
