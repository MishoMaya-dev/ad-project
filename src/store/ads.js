import * as firebase from "firebase/app"
import "firebase/database"
import "firebase/storage"

class Ad {
	constructor(title, description, ownerId, imgSrc, promo = '', id = null) {
		this.title = title;
		this.description = description;
		this.ownerId = ownerId;
		this.imgSrc = imgSrc;
		this.promo = promo;
		this.id = id;
	}
}

export default {

	state: {
		ads: []
	},
	mutations: {
		createAd(state, ad) {
			state.ads.push(ad)
		},
		loadAds(state, adsArr) {
			state.ads= adsArr
		},
		updateAd(state, { title, description, id }) {
			const ad = state.ads.find(a => {
				return a.id === id
			});
			ad.title = title;
			ad.description = description
		}
	},
	actions: {
		async createAd({ commit, getters }, payload) {
			commit('clearError');
			commit('setLoading', true);
			const image = payload.image;
			try {
				const newAd = new Ad(
					payload.title,
					payload.description,
					getters.users.id,
					'',
					payload.promo
				);
				const ad = await firebase.database().ref('ads').push(newAd);
				const imgExt = image.name.slice(image.name.lastIndexOf('.'));

				const fileData =
					await firebase.storage()
					.ref(`ads/${ad.key}/${imgExt}`)
					.put(image);
				const imgSrc = await fileData.ref.getDownloadURL();
				await firebase.database().ref('ads').child(ad.key).update({
					imgSrc
				});

				commit('createAd', {
					...newAd,

					id: ad.key,
					imgSrc
				});
				commit('setLoading', false)
			} catch (e) {
				commit('setError', e.message);
				commit('setLoading', false);
				throw e
			}
		},
		async fetchAd({ commit }) {
			commit('clearError');
			commit('setLoading', true);

			const resultAd = [];

			try {
				const fbVal = await firebase.database().ref('ads').once('value');
				const ads = fbVal.val();
				Object.keys(ads).forEach(key => {
					const ad = ads[key];
					resultAd.push(
						new Ad(
							ad.title,
							ad.description,
							ad.ownerId,
							ad.imgSrc,
							ad.promo,
							key
						)
					);
					commit('loadAds', resultAd)
				});
				commit('setLoading', false)
			} catch (e) {
				commit('setError', e.message);
				commit('setLoading', false);
				throw e
			}
		},
		async updateAd({ commit }, { title, description, id }) {
			commit('clearError');
			commit('setLoading', true);
			try {
				await firebase.database().ref('ads').child(id).update({
					title,
					description
				});
				commit('updateAd', { title, description, id });
				commit('setLoading', false)
			} catch (e) {
				commit('setLoading', false);
				commit('setError', e);
				throw e
			}
		}
	},
	getters: {
		ads(state) {
			return state.ads
		},
		promoAds(state) {
			return state.ads.filter(ad => ad.promo)
		},
		myAds(state, getters) {
			console.log("myAds", getters.users.id);
			return state.ads.filter(ad => ad.ownerId === getters.users.id)
		},
		adById(state) {
			return adId => state.ads.find(ad => ad.id === adId);
		}
	}
}
