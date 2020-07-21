import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import BuyModal from './components/Shared/BuyModal'

Vue.component('addBuyModal', BuyModal);
Vue.config.productionTip = false;
window.store = store;

const firebaseConfig = {
	apiKey: "AIzaSyAr5v77UOBPw819-beOrSKP6HTucWo1Sss",
	authDomain: "ad-project-369b8.firebaseapp.com",
	databaseURL: "https://ad-project-369b8.firebaseio.com",
	projectId: "ad-project-369b8",
	storageBucket: "ad-project-369b8.appspot.com",
	messagingSenderId: "619427136839",
	appId: "1:619427136839:web:1799d49f0bc6f7feed3862",
	measurementId: "G-YY269JGPZQ"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
	if (user) store.dispatch('onAuthUser', user);
	init();
	store.dispatch('fetchAd');
});

function init() {
	new Vue({
		router,
		store,
		vuetify,
		render: h => h(App),
	}).$mount('#app');

}
