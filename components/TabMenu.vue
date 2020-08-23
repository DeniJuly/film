<template>
    <ul class="nav nav-tabs nav-fill m-nav-tabs" ref="tabs">
        <li class="nav-item" ref="item">
            <nuxt-link class="nav-link" :class="{active: path.toLowerCase() == '/'}" to="/">Untuk Kamu</nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :class="{active: path.toLowerCase() == '/terbaru'}" to="/terbaru">Terbaru</nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :class="{active: path.toLowerCase() == '/terpopuler'}" to="/terpopuler">Terpopuler</nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :class="{active: path.toLowerCase() == '/akan-tayang'}" to="/akan-tayang">Akan Tayang</nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :class="{active: path.toLowerCase() == '/rating'}" to="/rating">Rating</nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'tab-menu',
    data(){
        return{
            path: this.$route.path
        }
    }
}
</script>

<style>

</style>