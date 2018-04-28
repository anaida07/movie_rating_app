import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    movies: [],
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
    },
  },
  actions: {
    addMovie: (context, payload) => {
      axios({
        method: 'post',
        data: payload,
        url: '/movies',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          context.commit('ADD_MOVIE', response.data);
        })
        .catch(() => {
          this.$swal(
            'Oh oo!',
            'Could not add the movie!',
            'error',
          );
        });
    },
    fetchMovies: (context) => {
      axios({
        method: 'get',
        url: '/movies',
      })
        .then((response) => {
          context.commit('MOVIES', response.data.movies);
        })
        .catch(() => {
        });
    },
  },
});
