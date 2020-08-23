<template>
  <div>
    <div class="cari mt-5" :class="{active: search}">
      <div class="container">
        <div class="row p-2">
          <form class="col-12 form-inline my-2 my-lg-0 mt-2">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Cari Film" v-model="cari" ref="cari" @keyup="getAutocomplete">
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">
                  <img src="/search-grey-20.svg" alt="search">
                </span>
              </div>
            </div>
          </form>
          <div class="autocomplete col-12">
            <card-film-horizontal class="text-white" :idFilm="film.id.toString()" :key="film.id" v-for="film in autocomplete"></card-film-horizontal>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-expand-lg navbar-light bg-white m-navbar">
      <div class="container">
        <a href="/" class="navbar-brand">
          <img src="/logo-full.svg" alt="">
        </a>
        <ul class="navbar nav ml-auto p-0">
          <li class="nav-item">
            <a href="#" @click.prevent="showSearch" class="nav-link">
              <img src="/search.svg" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search: false,
      cari: '',
      apiKey: '0ff23c1d5cedfb37a379bb7bf9907948',
      autocomplete: []
    }
  },
  methods: {
    showSearch: function(){
      this.search = !this.search
    },
    getAutocomplete: function(){
      this.$axios.get(`/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.cari}&page=1&include_adult=false`)
      .then(res => {
        this.autocomplete = res.data.results.slice(0,5)
        console.log(this.autocomplete);
      })
    }
  },
}
</script>

<style scoped>
  .cari {
    display: none;
  }
  .cari.active {
    display: block;
    position: absolute;
    z-index: 999;
    width: 100%;
    height: max-content;
    background: rgba(0,0,0,0.7);
  }
  .cari .input-group {
    width: 100%;
  }
  .cari input {
    border-color: #E0E0E0;
    border-right-width: 0px;
  }
  span#basic-addon2 {
    background: #FFFFFF;
    border-left-width: 0px;
    border-color: #E0E0E0;
  }
  .media {
    height: 100px;
    color: #FFFFFF;
  }
  .media img {
    height: 100%;
  }
  .autocomplete {
    max-height: 400px;
    overflow-y: scroll;
  }
</style>