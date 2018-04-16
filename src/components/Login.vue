<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :rules="passwordRules"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn><br/>
  </v-form>
</template>
<script>
  import axios from 'axios';
  import bus from "./../bus.js";

  export default {
    data: () => ({
      valid: true,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ]
    }),
    methods: {
      async submit () {
        if (this.$refs.form.validate()) {
          return axios({
            method: 'post',
            data: {
              email: this.email,
              password: this.password
            },
            url: '/api/users/login',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            localStorage.setItem('jwtToken', response.data.token)
            this.$swal("Good job!", "You are ready to start!", "success");
            bus.$emit("refreshUser");
            this.$router.push({ name: 'Home' });
          })
          .catch((error) => {
            const message = error.response.data.message;
            this.$swal("Oh oo!", `${message}`, "error")
          });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
