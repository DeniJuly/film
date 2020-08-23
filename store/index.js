export const state = () => ({
    download: true
})

export const getters = {
    download: function(state){
        return state.download
    }
}

export const mutations = {
    CHANGE_DOWNLOAD: function(state, download){
        state.download = download
    }
}

export const actions = {
    changeDownload: function({commit}, download){
        commit('CHANGE_DOWNLOAD', download)
    }
}