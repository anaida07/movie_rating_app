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
      :items="years"
    ></v-select>
    <v-text-field
      label="Movie Genre"
      v-model="genre"
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
  export default {
    data: () => ({
      valid: true,
      name: '',
      description: '',
      genre: '',
      release_year: '',
      nameRules: [
        (v) => !!v || 'Movie name is required'
      ],
      select: null,
      years: [
        '2018',
        '2017',
        '2016',
        '2015'
      ],
      checkbox: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Perform next action
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
