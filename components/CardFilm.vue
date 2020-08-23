<template>
    <nuxt-link :to="`/film/${id}`" class="item-film">
        <div class="card card-film">
            <div class="card-body p-0">
            <img :src="poster" alt="">
            </div>
        </div>
        <div class="detail-film mt-2">
            <h6 class="judul">{{ judul }}</h6>
            <div class="rating d-flex align-items-center">
            <div class="icon mr-1">
                <img src="/star-10.svg" alt="star-10">
            </div>
            <p class="m-0">{{ rating }}</p>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    name: 'card-film',
    props:{
        id: String,
        poster: String,
        judul: String,
        rating: String
    }
}
</script>

<style scoped>
    .card.card-film {
        border: none;
        border-radius: 3px;
        overflow: hidden;
    }
    .item-film .detail-film .icon img {
        width: 10px;
    }
    .detail-film .judul {
        font-family: 'poppins-medium';
    }
    .detail-film .rating p {
        font-size: 12px;
    }
</style>