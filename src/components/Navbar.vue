<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <router-link to="/">
      <img :src="require('@/assets/logo.png')" alt="logo" class="logo" />
    </router-link>
    <div class="container">
      <router-link to="/" class="navbar-brand">Vue Firebase App</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <div class="inner-container">
              <div class="nav-item">
                Hello {{ user.data.displayName }}
                <span>|</span>
              </div>
              <div>
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="signOut">Sign out</a>
                </li>
              </div>
            </div>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>

            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          });
        });
    }
  }
};
</script>

