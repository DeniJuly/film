import Vue from 'vue'
import {mapGetters} from 'vuex'

const download = {
    install(Vue, options){
        Vue.mixin({
            computed: {
                ...mapGetters({
                    download: 'download'
                })
            }
        })
    }
}

Vue.use(download)