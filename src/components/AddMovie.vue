<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Movie Name"
      v-model="name"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      name="input-7-1"
      label="Movie Description"
      v-model="description"
      multi-line
    ></v-text-field>
    <v-select
      label="Movie Release Year"
      v-model="release_year"
      required
      :rules="releaseRules"
      :items="years"
    ></v-select>
    <v-text-field
      label="Movie Genre"
      v-model="genre"
      required
      :rules="genreRules"
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    genre: '',
    release_year: '',
    nameRules: [
      v => !!v || 'Movie name is required',
    ],
    genreRules: [
      v => !!v || 'Movie genre year is required',
      v => (v && v.length <= 80) || 'Genre must be less than equal to 80 characters.',
    ],
    releaseRules: [
      v => !!v || 'Movie release year is required',
    ],
    select: null,
    years: [
      '2018',
      '2017',
      '2016',
      '2015',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            description: this.description,
            release_year: this.release_year,
            genre: this.genre,
          },
          url: 'http://localhost:8081/movies',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Great!',
              'Movie added successfully!',
              'success',
            );
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Oh oo!',
              'Could not add the movie!',
              'error',
            );
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
