
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {BASE_URL} from '../helper/constant'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      covidResponse: [],
      loading: true
    },
    actions: {
      loadData({
        commit
      }) {
        axios.get("https://indonesia-covid-19.mathdro.id/api/").then((response) => {
            commit('updateCovidResponse', response.data)
            commit('changeLoadingState', false)
        }).catch((error) => {
            console.log(error)
            commit('changeLoadingState', false)
        })
      }
    },
    mutations: {
        updateCovidResponse(state, payload) {
            state.covidResponse = payload
        },
        changeLoadingState(state, loading) {
            state.loading = loading
        }
    }
  })