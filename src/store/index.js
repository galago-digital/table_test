import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table'
import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        table,
        form
    }
})