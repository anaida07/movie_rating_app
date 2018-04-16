<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Full Name"
      v-model="fullname"
      :rules="fullnameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      hint="At least 6 characters"
      v-model="password"
      :rules="passwordRules"
      required
      min="6"
      :append-icon="e1 ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (e1 = !e1)"
      :type="e1 ? 'password' : 'text'"
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
      e1: false,
      valid: true,
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
      fullnameRules: [
        (v) => !!v || 'Fullname is required'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required'
      ]
    }),
    methods: {
      async submit () {
        if (this.$refs.form.validate()) {
          return axios({
            method: 'post',
            data: {
              fullname: this.fullname,
              email: this.email,
              password: this.password
            },
            url: '/api/users/register',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            this.$swal(
              'Great!',
              `You have been successfully registered!`,
              'success'
            )
            this.$router.push({ name: 'Home' })
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
