
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
var BASE_URL = "https://indonesia-covid-19.mathdro.id/api/"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      covidResponse: [],
      covidByProvinsi: [],
      loading: true
    },
    actions: {
      loadData({
        commit
      }) {
        axios.get(BASE_URL).then((response) => {
            commit('updateCovidResponse', response.data)
            commit('changeLoadingState', false)
        }).catch((error) => {
            console.log(error)
            commit('changeLoadingState', false)
        })
      },
      loadDataByProvince({
        commit
      }) {
        axios.get(BASE_URL+"provinsi").then((response) => {
            commit('updateCovidByProvinsiResponse', response.data)
        }).catch((error) => {
            console.log(error)
        })
      }
    },
    mutations: {
        updateCovidResponse(state, payload) {
            state.covidResponse = payload
        },
        updateCovidByProvinsiResponse(state, payload) {
            state.covidByProvinsi = payload
        },
        changeLoadingState(state, loading) {
            state.loading = loading
        }
    },
    getters: {
        getCovidResponse(state){
            return state.covidResponse
        },
        getCovidByProvince(state)
        {
            return state.covidByProvinsi
        },
        getLoading(state){
            return state.loading
        }
    }
  })