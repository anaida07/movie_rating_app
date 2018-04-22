<template>
  <div>
    <div class="login">
      <a href="/login/facebook">Facebook</a>
      <a href="/login/twitter">Twitter</a>
      <a href="/login/google">Google</a>
      <a href="/login/linkedin">Linkedin</a>
    </div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        id="email"
        required
      ></v-text-field>
      <v-text-field
      label="Password"
      hint="At least 6 characters"
      v-model="password"
      :rules="passwordRules"
      id="password"
      required
      :append-icon-cb="() => (e1 = !e1)"
      :append-icon="e1 ? 'visibility_off' : 'visibility'"
      :type="e1 ? 'password' : 'text'"
    ></v-text-field>
      <v-btn
        @click="submit"
        :disabled="!valid"
        id="login"
      >
        submit
      </v-btn>
      <v-btn @click="clear" id="clear_input">clear</v-btn><br/>
    </v-form>
  </div>
</template>
<script>
import axios from 'axios';
import bus from './../bus';

export default {
  data: () => ({
    e1: true,
    valid: true,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      // v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => (!!v || 'Password is required'),
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            email: this.email,
            password: this.password,
          },
          url: '/users/login',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal('Good job!', 'You are ready to start!', 'success');
            bus.$emit('refreshUser');
            this.$router.push({ name: 'Home' });
          })
          .catch((error) => {
            const message = error.response.data.message;
            this.$swal('Oh oo!', `${message}`, 'error');
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
