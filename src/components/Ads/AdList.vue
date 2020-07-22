<template>
  <v-container>
    <v-layout
      row
      justify-center
      v-if="!loading && myAds.length"
    >
      <v-flex xs12 sm10 md6>
        <h1 class="text--secondary mb-3">My Ads</h1>
        <v-card
          class="elevation-10 mb-3"
          v-for="ad in myAds"
          :key="ad.id"
        >
          <v-layout>
            <v-flex xs4>
              <v-img
              :src="ad.imgSrc"
              height="160px"
              />
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="mb-3">{{ ad.title }}</h2>
                <p class="mb-0 overflow">{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions class="justify-end pr-5">
                <v-btn
                  class="primary"
                  :to="'/ad/' + ad.id"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      row
      v-else-if="!loading && !myAds.length"
    >
      <v-flex
        xs12
        class="justify-center"
      >
        <h1 class="text-center pt-5">You have no ads</h1>
      </v-flex>
    </v-layout>
    <div v-else>
      <v-container>
        <v-layout xs12 row class="justify-center pt-5">
          <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          />
        </v-layout>
      </v-container>
    </div>
  </v-container>
</template>

<script>
	export default {
		computed: {
			myAds() {
				return this.$store.getters.myAds
      },
      loading() {
				return this.$store.getters.loading
      }
    }
	}
</script>
<style scoped>
  .overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
