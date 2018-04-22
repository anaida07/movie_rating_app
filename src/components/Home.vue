<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat v-bind:to="`/movies/${movie._id}`">
                {{ movie.name }}
              </v-btn>
            </div>
            <span class="grey--text">{{ movie.release_year }} ‧ {{ movie.genre }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'Movies',
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    },
  },
  mounted() {
    this.$store.dispatch('fetchMovies');
  },
};
</script>
