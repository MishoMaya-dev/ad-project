import * as firebase from "firebase/app"
import "firebase/database"
import "firebase/storage"

class Order {
	constructor(name, phone, adId, done = false, id = null) {
		this.name = name;
		this.phone = phone;
		this.adId = adId;
		this.done = done;
		this.id = id
	}
}

export default {
	state: {
		orders: []
	},
	mutations: {
		loadOrders(state, payload) {
			state.orders = payload
		}
	},
	actions: {
		async createOrder({ commit }, { name, phone, adId, userId }) {
			const order = new Order(name, phone, adId);
			commit('clearError');
			try {
				firebase.database().ref(`/users/${userId}/orders`).push(order)
			} catch (e) {
				commit('setError', e.message);
				throw e
			}
		},
		async fetchOrder({ commit, getters }) {
			commit('setLoading', true);
			commit('clearError');
			const resOrders = [];
			try {
				const fbVal = await firebase.database().ref(`/users/${getters.users.id}/orders`).once('value');
				const orders = fbVal.val();
				orders && Object.keys(orders).forEach(key => {
					const o = orders[key];
					resOrders.push(
						new Order(o.name, o.phone, o.adId, o.done, key)
					)
				});
				commit('loadOrders', resOrders);
				commit('setLoading', false)
			} catch (e) {
				commit('setLoading', false);
				commit('setError', e.message);
				throw e
			}
		},
		async markOrderDone({ commit, getters }, payload) {
			commit('clearError');
			try {
				await firebase.database().ref(`/users/${getters.users.id}/orders`).child(payload).update({
					done: true
				})
			} catch (e) {
				commit('setError', e.message);
				throw e
			}
		}
	},
	getters: {
		doneOrders(state) {
			return state.orders.filter(o => o.done)
		},
		undoneOrders(state) {
			return state.orders.filter(o => !o.done)
		},
		orders(state, getters) {
			return getters.undoneOrders.concat(getters.doneOrders)
		}
	}
}
