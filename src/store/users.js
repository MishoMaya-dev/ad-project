import * as firebase from "firebase/app"
import "firebase/auth"

class User {
	constructor(id) {
		this.id = id
	}
}

export default {
	state: {
		users: null
	},
	mutations: {
		setUser(state, payload) {
			state.users = payload;
		}
	},
	actions: {
		async createUser({ commit }, { email, password }) {
			try {
				commit('clearError');
				commit('setLoading', true);
				const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
				commit('setUser', new User(user.uid));
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error
			}
		},
		async loginUser({ commit }, { email, password }) {
			try {
				commit('clearError');
				commit('setLoading', true);
				const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
				commit('setUser', new User(user.uid));
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error
			}
		},
		onAuthUser({ commit }, user) {
			commit('setUser', new User(user.uid))
		},
		logoutUser({ commit }) {
			firebase.auth().signOut();
			commit('setUser', null)
		}
	},
	getters: {
		users(state) {
			return state.users;
		},
		isUserLoggedIn(state) {
			return state.users !== null;
		}
	}
}
