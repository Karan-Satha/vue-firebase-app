import Vue from "vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";
import "./styles/index.css";

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyARZbVgfnEWaRx-hBD5V8xF_iQ-qY4udME",
  authDomain: "vue-firebase-auth-3f162.firebaseapp.com",
  databaseURL: "https://vue-firebase-auth-3f162.firebaseio.com",
  projectId: "vue-firebase-auth-3f162",
  storageBucket: "vue-firebase-auth-3f162.appspot.com",
  messagingSenderId: "10503149287",
  appId: "1:10503149287:web:fd8ac6486351ecc5543442",
  measurementId: "G-MWPNFFTQHW"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.use(BootstrapVue);

// Keep authentication state alive
let app = "";
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
