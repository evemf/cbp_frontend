<template>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="text-h5">Login</v-card-title>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  required
                />
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="[rules.required]"
                  type="password"
                  required
                />
                <v-btn :disabled="!valid" @click="login" color="primary" block>
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        valid: false,
        rules: {
          required: value => !!value || 'This field is required',
          email: value => /.+@.+/.test(value) || 'Enter a valid email',
        },
      };
    },
    methods: {
      async login() {
        const credentials = { email: this.email, password: this.password };
        await this.$store.dispatch('login', credentials);
      },
    },
  };
  </script>
  