<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ movie.name }}</div>
            <span class="grey--text">{{ movie.release_year }} ‧ {{ movie.genre }}</span>
          </div>
        </v-card-title>
        <h6 class="card-title" id="rate_movie" v-if="current_user" @click="rate">Rate this movie</h6>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios';

import Vue from 'vue';
import StarRating from 'vue-star-rating';
let wrapper = document.createElement('div');

// shared state
let state = {
  note: 0
}

// crate component to content
let RatingComponent = Vue.extend({
  data() {
    return {rating: 0}
  },
  watch: {
    rating (newVal) { state.note = newVal }
  },
  template: `
    <div class="rating">
      How was your experience getting help with this issues?
      <star-rating v-model="rating" :show-rating="false"></star-rating>
    </div>`,
  components: { 'star-rating': StarRating }
})

let component = new RatingComponent().$mount(wrapper)

export default {
  name: 'Movie',
  data() {
    return {
      movie: [],
      current_user: null
    };
  },
  mounted() {
    this.fetchMovie();
    this.fetchUser();
  },
  methods: {
    async rate() {
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: {
            value: 0
          }
        }
      }).then(() => {
        // this.$swal('Thanks for note ' + state.note);
        const movie_id = this.$route.params.id
        const user_id = this.current_user._id;
        return axios({
          method: 'post',
          data: {
            rate: state.note,
            user_id: user_id
          },
          url: `/movies/rate/${movie_id}`,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          this.$swal("Thank you for rating " + state.note + " !", "success");
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal("Oh oo!", `${message}`, "error")
        });
      })
    },
    async fetchMovie() {
      return axios({
        method: 'get',
        url: `/api/movies/${this.$route.params.id}`,
      })
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
        });
    },
    async fetchUser() {
      return axios({
        method: 'get',
        url: '/api/current_user',
      })
        .then((response) => {
          this.current_user = response.data.current_user
        })
        .catch((error) => {
          this.$router.push({ name: 'Home' });
        });
    }
  },
};
</script>
