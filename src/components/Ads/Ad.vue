<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading && ad">
          <v-img
            :src="ad.imgSrc"
          />
          <v-card-text>
            <h1 class="mb-3">{{ ad.title }}</h1>
            <p class="mb-0">{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <addEditAdModal :ad="ad" v-if="isOwner"/>
            <addBuyModal :ad="ad"/>
          </v-card-actions>
        </v-card>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
	import EditAdModal from "./EditAdModal";

	export default {
		props: ['id'],
		computed: {
			ad() {
				return this.$store.getters.adById(this.id);
      },
      loading() {
				return this.$store.getters.loading
      },
      isOwner() {
				return this.ad.ownerId === this.$store.getters.users.id
      }
    },
    components: {
			addEditAdModal: EditAdModal
    }
	}
</script>
