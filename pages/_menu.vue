<template>
  <div>
    <!-- header -->
    <main-navbar></main-navbar>
    <!-- tab menu -->
    <div class="container tabbable">
      <tab-menu></tab-menu>
    </div>
    <!-- film -->
    <div class="toTop position-fixed">
      <a href="#" @click.prevent="scrollToTop">
        <img src="/arrow-up-23.svg" alt="">
      </a>
    </div>
    <div class="container mt-3">
      <card-film-horizontal :idFilm="film.id.toString()" :key="index" v-for="(film, index) in films"></card-film-horizontal>
      <infinite-load @distance="1" @infinite="getFilm"></infinite-load>
    </div>
  </div>
</template>

<script>
import Carousel from 'vue-owl-carousel'
import InfiniteLoad from 'vue-infinite-loading'

// components
import TabMenu from '../components/TabMenu'
import MainNavbar from '../components/MainNavbar'
import CardFilmHorizontal from '../components/CardFilmHorizontal'

export default {
  head(){
    return{
      title: this.$route.params.menu + ' - Film',
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
      films:[],
      menu: this.$route.params.menu.toLowerCase(),
      apiKey: '0ff23c1d5cedfb37a379bb7bf9907948',
      page: 1
    }
  },
  methods: {
    getFilm($state){
      let response = null
      if (this.menu == 'terbaru') {
        this.$axios.get(`/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${this.page}`)
        .then(res => {
          this.films.push(...res.data.results)
          this.page += 1
          $state.loaded();
        })
      } else if(this.menu == 'terpopuler') {
        this.$axios.get(`/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.page}`)
        .then(res => {
          this.films.push(...res.data.results)
          this.page += 1
          $state.loaded();
        })
      } else if(this.menu == 'akan-tayang') {
        this.$axios.get(`/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=${this.page}`)
        .then(res => {
          this.films.push(...res.data.results)
          this.page += 1
          $state.loaded();
        })
      } else if(this.menu == 'rating') {
        this.$axios.get(`/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=${this.page}`)
        .then(res => {
          this.films.push(...res.data.results)
          this.page += 1
          $state.loaded();
        })
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },
  components:{
    MainNavbar,
    TabMenu,
    CardFilmHorizontal,
    InfiniteLoad
  }
}
</script>

<style scoped>
  .toTop {
    width: 40px;
    height: 40px;
    background: #F4ADAD;
    border-radius: 100%;
    text-align: center;
    padding: 7px;
    bottom: 30px;
    right: 30px;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
  }
</style>