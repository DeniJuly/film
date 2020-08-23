<template>
    <nuxt-link :to="`/film/${idFilm}`" class="film">
        <div class="media mb-2">
            <img class="mr-3 poster" :src="`${'https://image.tmdb.org/t/p/w220_and_h330_face' + film.poster_path || '/default-poster.svg'} `" :alt="film.original_title" v-if="this.film.poster_path != undefined">
            <div class="media-body">
                <h5 class="mb-0 mt-0 judul">{{ film.original_title }}</h5>
                <p class="tahun m-0">{{ film.release_date.substr(0,4) }}</p>
                <div class="genre d-flex">
                    <p class="m-0 mr-1"><span v-for="genre in film.genres" :key="genre.id">{{ genre.name }}, </span></p>
                </div>
                <div class="rating mt-3">
                    <p class="m-0">{{ film.vote_average }}</p>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    name: 'card-film-horizontal',
    props: {
        idFilm: String
    },
    data(){
        return{
            apiKey: '0ff23c1d5cedfb37a379bb7bf9907948',
            film: {
                release_date: ''
            }
        }
    },
    created(){
        this.$axios.get(`/movie/${this.idFilm}?api_key=${this.apiKey}&language=en-US`)
        .then(res => {
            this.film = res.data
        })
    }
}
</script>

<style scoped>
    .judul {
        font-family: 'poppins-medium';
    }
    .media-body {
        font-size: 12px;
    }
    .poster {
        width: 100px;
        border-radius: 3px;
    }
    .media {
        width: 100%;
    }
    .rating {
        background: rgba(246, 209, 134, 0.65);
        border: 1px solid #F6D186;
        box-sizing: border-box;
        border-radius: 3px;
        width: 40px;
        text-align: center;
    }
    .rating p {
        width: 100%;
        text-align: center;
    }
</style>