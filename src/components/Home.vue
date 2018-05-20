<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
    <!--    <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
        </v-flex> -->
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn large router to="/apostas" class="info">Cadastrar Palpites</v-btn>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2" v-if="!loading">
        <v-flex xs12>
          <v-carousel style="cursor: pointer;">
            <v-carousel-item
            v-for="img in imgs"
            :src="img.url"
            :key="img.url"
            >
            <!--<div class="title">
              {{ meetup.title }}
            </div>-->
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <!-- <p>essa feraa</p> -->
     </v-flex>
   </v-layout>
 </v-container>
</v-app>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    },
    imgs () {
      var imgs = [
        {url: 'https://cafebrasil.blob.core.windows.net/media/2018/04/World-Cup-2018-logo-1.jpg'},
        {url: 'https://ep01.epimg.net/brasil/imagenes/2017/12/01/deportes/1512132606_493398_1512133232_noticia_normal.jpg'},
        {url: 'https://abrilveja.files.wordpress.com/2017/06/gabriel-jesus-phelippe-coutinho-neymar-037.jpg?quality=70&strip=info&w=680&h=453&crop=1'},
        {url: 'https://www.gazetaesportiva.com/wp-content/uploads/imagem/2017/09/05/Sala-1024x596.png'},
        {url: 'http://www.eluniversal.com.co/sites/default/files/201408/key.jpg'}
      ]
      return imgs
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
