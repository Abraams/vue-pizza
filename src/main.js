import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import currencyFilter from "./filter/currency.filter";

// import { ContentLoader } from "vue-content-loader";

import firebase from "firebase/app";
import "firebase/database";

Vue.config.productionTip = false;

Vue.filter("currency", currencyFilter);

const firebaseConfig = {
	apiKey: "AIzaSyAm8zhjyWmZVe0uGokok1czg2C52o36jVk",
	authDomain: "vue2-pizza.firebaseapp.com",
	databaseURL: "https://vue2-pizza.firebaseio.com",
	projectId: "vue2-pizza",
	storageBucket: "vue2-pizza.appspot.com",
	messagingSenderId: "332308485456",
	appId: "1:332308485456:web:0e6a5e42cace126ec7c855",
};

firebase.initializeApp(firebaseConfig);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
