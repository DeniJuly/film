<template>
  <div class="page">
    <div class="backdrop" :style="{background: `url(https://image.tmdb.org/t/p/w1280/${film.backdrop_path})`}" v-if="film.length != 0">
      <div class="filter pt-3 pb-3">
        <div class="container">
          <div class="header d-flex">
            <nuxt-link to="/" class="back">
              <img src="/arrow-left-20.svg" alt="">
            </nuxt-link>
          </div>
          <div class="film media">
              <img class="mr-3 poster" :src="'https://image.tmdb.org/t/p/w220_and_h330_face' + film.poster_path" :alt="film.original_title" v-if="film.length != 0">
              <div class="media-body">
                  <h5 class="mt-0 judul pm">{{ film.original_title }}</h5>
                  <p class="tahun text-center m-0">{{ film.release_date.substr(0,4) }}</p>
                  <div class="genre mt-1">
                    <span v-for="genre in film.genres" :key="genre.id">{{ genre.name }}</span>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- detail film -->
      <div class="detail-film d-flex mb-4 mt-4">
        <div class="item border-right">
          <p class="header m-0">Durasi</p>
          <h5 class="m-0 isi pm">{{film.runtime}} MENIT</h5>
        </div>
        <div class="item border-right">
          <p class="header m-0">Bahasa</p>
          <h5 class="m-0 isi pm" v-for="(bahasa, index) in film.spoken_languages" :key="index">{{ bahasa.name }}</h5>
        </div>
        <div class="item">
          <p class="header m-0">Rating</p>
          <h5 class="m-0 isi pm">{{ film.vote_average }}</h5>
        </div>
      </div>
      <!-- sinopsis -->
      <section class="mb-4">
        <h5 class="title-section pm">Sinopsis</h5>
        <p class="m-0 sinopsis">{{ film.overview }}</p>
      </section>
      <!-- aktor -->
      <section class="mb-4" v-if="cast.length > 0">
        <h5 class="title-section pm">Aktor</h5>
        <carousel
          :nav="false"
          :items="jmlCast"
          :dots="false"
          :margin="10"
          v-if="cast.length > 0"
          class="owl-theme"
        >
          <div class="card border-0" v-for="(cast, index) in cast" :key="index">
            <div class="foto">
              <img :src="`https://image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}`" alt="cast.name" v-if="cast.profile_path">
              <img src="/default-aktor.svg" alt="cast.name" v-else>
            </div>
            <div class="detail-cast mt-2 text-center">
              <h6 class="m-0 pm">{{ cast.name }}</h6>
              <p class="m-0">{{ cast.character }}</p>
            </div>
          </div>
        </carousel>
      </section>
      <!-- rekomandasi -->
      <div class="section-film mb-4" v-if="rekomendasi.length > 0">
        <div class="header d-flex">
          <h5 class="title-section pm">Rekomendasi Film</h5>
        </div>
        <carousel
          :nav="false"
          :dots="false"
          :items="jmlCast"
          :margin="5"
          v-if="rekomendasi.length > 0"
          class="owl-theme"
        >
        <template>
          <card-film v-for="rekomendasi in rekomendasi" :key="rekomendasi.id" :id="rekomendasi.id.toString()" :poster="`https://image.tmdb.org/t/p/w220_and_h330_face${rekomendasi.poster_path}`"
          :judul="rekomendasi.original_title"
          :rating="rekomendasi.vote_average.toString()"></card-film>
        </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Carousel from 'vue-owl-carousel'
import CardFilm from '../../components/CardFilm'

export default {
  data(){
    return{
      jmlCast: 3,
      film: [],
      cast : [],
      rekomendasi: [],
      apiKey: '0ff23c1d5cedfb37a379bb7bf9907948',
    }
  },
  methods: {
    getDetailFim(){
      this.$axios.get(`/movie/${this.$route.params.id}?api_key=${this.apiKey}&language=en-US`)
      .then(res => {
        this.film = res.data
      })
    },
    getRecomenFilm(){
      this.$axios.get(`/movie/${this.$route.params.id}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(res => {
        this.rekomendasi = res.data.results.slice(0,10)
      })
    },
    getCreditFilm(){
      this.$axios.get(`/movie/${this.$route.params.id}/credits?api_key=${this.apiKey}`)
      .then(res => {
        this.cast = res.data.cast
      })
    }
  },
  computed: {
    durasi(){
    }
  },
  components: {
    Carousel,
    CardFilm
  },
  created(){
    this.getDetailFim()
    this.getRecomenFilm()
    this.getCreditFilm()
    let screen = window.innerWidth
    if(screen < 440){
      this.jmlCast = 3
    } else if(screen < 750){
      this.jmlCast = 4
    } else if (screen < 900) {
      this.jmlCast = 5
    } else if(screen > 900){
      this.jmlCast = 6
    }
  },
  updated(){
    let screen = window.innerWidth
    if(screen < 440){
      this.jmlCast = 3
    } else if(screen < 750){
      this.jmlCast = 4
    } else if (screen < 900) {
      this.jmlCast = 5
    } else if(screen > 900){
      this.jmlCast = 6
    }
  }
}
</script>

<style scoped>
  .header a {
    background: rgba(255,255,255,0.72157);
    border-radius: 100%;
    padding: 8px;
    width: 40px;
    height: 40px;
    padding-top: 7px;
  }
  .backdrop {
    background-size: cover!important;
    background-position: center!important;
  }
  .filter {
    background: rgba(0,0,0,0.4);
  }
  .poster {
      width: 100px;
      border-radius: 3px;
  }
  .judul {
    color: #ffffff;
  }
  .genre span {
    text-align: center;
    margin-bottom: 5px;
    display: inline-block;
  }
  .tahun,
  .genre span {
    padding: 0 5px;
    width: max-content;
    margin-right: 5px;
    background: rgba(63, 80, 150, 0.8);
    border: 1px solid #3D4D9A;
    box-sizing: border-box;
    border-radius: 3px;
    color: #ffffff;
  }
  .detail-film {
    justify-content: center;
    align-items: center;
  }
  .detail-film .item {
    flex: 1;
    max-width: 150px;
    text-align: center;
  }
  .sinopsis {
    font-size: 15px;
  }
  .foto {
    width: 100px;
    margin: auto;
    border-radius: 100px;
    height: 100px;
    overflow: hidden;
  }
  /* responsive */
  @media only screen and (max-width: 768px){
    .film.media {
      margin-top: 100px;
    }
  }
  @media only screen and (min-width: 768px){
    .film.media {
      margin-top: 100px;
    }
  }
  @media only screen and (min-width: 1000px){
    .film.media {
      margin-top: 120px;
    }
  }
  @media only screen and (min-width: 1200px){
    .film.media {
      margin-top: 190px;
    }
  }
</style>