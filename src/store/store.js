import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    movies: []
  },
  getters: {
    fetchMovies: state => state.movies,
  },
  mutations: {
    ADD_MOVIE: (state, payload) => {
      state.movies.unshift(payload);
    },
    MOVIES: (state, payload) => {
      state.movies = payload;
    }
  },
  actions: {
    addMovie: (context, payload) => {
      context.commit("ADD_MOVIE", payload)
    },
    fetchMovies: (context, payload) => {
      axios({
        method: 'get',
        url: '/movies',
      })
        .then((response) => {
          context.commit("MOVIES", response.data.movies);
        })
        .catch(() => {
        });
    }
  }
})
