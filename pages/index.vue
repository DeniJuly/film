<template>
  <div>
    <!-- header -->
    <main-navbar></main-navbar>
    <!-- tab menu -->
    <div class="container tabbable mb-3">
      <tab-menu></tab-menu>
    </div>
    <!-- akan tayang -->
    <div class="container mb-3">
      <h5 class="title-section">Akan Tayang</h5>
      <div class="akan-tayang mt-1">
        <carousel
          :nav="false"
          :dots="true"
          :items="1"
          :autoplay="true"
          v-if="akanTayang.length > 0"
          class="owl-theme"
        >
          <div class="card card-akan-tayang" v-for="film in akanTayang" :key="film.id" :style="{background: `url(https://image.tmdb.org/t/p/w780${film.backdrop_path || `rgba(0,0,0,0.3)`})`}">
            <div class="filter">
              <div class="card-body">
                <div class="detail-film d-flex">
                  <div class="poster">
                    <img :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${film.poster_path}`" :alt="film.original_title" width="100%" height="auto">
                  </div>
                  <nuxt-link :to="`film/${film.id}`" class="film text-white">
                    <h5 class="judul m-0 pm">{{ film.original_title }}</h5>
                    <div class="genre">
                      <span v-for="genre in film.genre_ids" :key="genre">{{ getGenreName(genre) }} </span>
                    </div>
                    <div class="d-flex rating">
                      <img src="/star-10.svg" alt="rating" class="icon mr-1">
                      <p class="rating">6.5</p>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </carousel>
      </div>
    </div>
    <!-- film terbaru -->
    <div class="container">
      <div class="section-film mb-3">
        <div class="header d-flex">
          <h5 class="title-section">Film Terbaru</h5>
          <nuxt-link to="/terbaru" class="ml-auto">
            <img src="/arrow-right.svg" alt="arrow-right">
          </nuxt-link>
        </div>
        <carousel
          :nav="false"
          :dots="false"
          :items="jml"
          :margin="5"
          v-if="terbaru.length > 0"
          class="owl-theme"
        >
        <template>
          <card-film v-for="film in terbaru" :key="film.id" :id="film.id.toString()" :poster="`https://image.tmdb.org/t/p/w220_and_h330_face/${film.poster_path || 'rgba(0,0,0,0.3)'}`"
          :judul="film.original_title" :rating="film.vote_average.toString()"></card-film>
        </template>
        </carousel>
      </div>
    </div>
    <!-- film terpopuler -->
    <div class="container">
      <div class="section-film mb-3">
        <div class="header d-flex">
          <h5 class="title-section">Film Terpopuler</h5>
          <nuxt-link to="/terpopuler" class="ml-auto">
            <img src="/arrow-right.svg" alt="arrow-right">
          </nuxt-link>
        </div>
        <carousel
          :nav="false"
          :dots="false"
          :items="jml"
          :margin="5"
          v-if="terpopuler.length > 0"
          class="owl-theme"
        >
        <template>
          <card-film v-for="film in terpopuler" :key="film.id" :id="film.id.toString()" :poster="`https://image.tmdb.org/t/p/w220_and_h330_face/${film.poster_path || 'rgba(0,0,0,0.3)'}`"
          :judul="film.original_title" :rating="film.vote_average.toString()"></card-film>
        </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@nuxtjs/axios'

// components
import CardFilm from '../components/CardFilm'
import TabMenu from '../components/TabMenu'
import Carousel from 'vue-owl-carousel'
import MainNavbar from '../components/MainNavbar'

export default {
  head(){
    return{
      title: 'Film',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'website untuk mencari film-film yang akan tayang maupun sudah tayang, kamu dapat melihat detail fillm mulai dari sinopsis, rating, hingga pemeran film'
        }
      ]
    }
  },
  data(){
    return{
      terbaru: [],      
      terpopuler: [],
      akanTayang: [],
      genre: [],
      jml: 0,
      apiKey: '0ff23c1d5cedfb37a379bb7bf9907948'
    }
  },
  methods: {
    getAkanTayang(){
      this.$axios.get(`/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(res => {
        this.akanTayang = res.data.results.slice(0,5)
      })
    },
    getTerbaru(){
      this.$axios.get(`/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(res => {
        this.terbaru = res.data.results.slice(0,10)
      })
    },
    getTerpopuler(){
      this.$axios.get(`/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(res => {
        this.terpopuler = res.data.results.slice(0,10)
      })
    },
    getGenre(){
      this.$axios.get(`/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
      .then(res => {
        this.genre = res.data.genres
      })
    },
    getGenreName(id){
      for (let i = 0; i < this.genre.length; i++) {
        if(this.genre[i].id == id){
          return this.genre[i].name
        }
      }
    }
  },
  created(){
    this.getGenre()
    this.getAkanTayang()
    this.getTerbaru()
    this.getTerpopuler()
    let screen = window.innerWidth
    if(screen < 440){
      this.jml = 3
    } else if(screen < 750){
      this.jml = 4
    } else if (screen < 900) {
      this.jml = 5
    } else if(screen > 900){
      this.jml = 6
    }
  },
  components:{
    MainNavbar,
    Carousel,
    CardFilm,
    TabMenu
  }
}
</script>

<style scoped>
  /* section */
  .title-section {
    font-family: 'poppins-medium';
    font-size: 17px;
  }
  /* akan tayang */
  .card-akan-tayang {
    background-size: cover!important;
    border: none;
    border-radius: 5px;
    overflow: hidden;
  }
  .card-akan-tayang .detail-film {
    margin-top: 50px;
  }
  .card-akan-tayang .detail-film .poster {
    min-width: 110px;
    max-width: 110px;
    border-radius: 5px;
    margin-right: 10px;
    overflow: hidden;
  }
  .card-akan-tayang .detail-film .film {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .card-akan-tayang .detail-film p {
    margin: 0;
    font-size: 12px;
  }
  .card-akan-tayang .detail-film .d-flex.rating {
    flex-direction: row;
  }
  .card-akan-tayang .detail-film .rating img {
    width: 10px;
  }
  .card-akan-tayang .filter {
    background: rgba(0,0,0,0.4);
  }
  /* film terbaru */
  /* responsive */
  @media only screen and (min-width: 768px){
    .card-akan-tayang .detail-film {
      margin-top: 70px;
    }
    .detail-film .poster {
      width: 70px;
    }
  }
  @media only screen and (min-width: 1000px){
    .card-akan-tayang .detail-film {
      margin-top: 90px;
    }
    .detail-film .poster {
      width: 90px;
    }
  }
  @media only screen and (min-width: 1200px){
    .card-akan-tayang .detail-film {
      margin-top: 130px;
    }
    .detail-film .poster {
      width: 130px;
    }
  }
</style>
