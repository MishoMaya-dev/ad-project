<template>
  <v-dialog
    width="400px"
    v-model="modal"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="primary"
        v-bind="attrs"
        v-on="on"
      >
        Buy
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title class="headline">Buy Ad</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout row class="ma-0">
          <v-flex xs12>
            <v-text-field
              label="Your name"
              name="name"
              type="text"
              v-model="name"
            >
              {{ name }}
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row class="ma-0">
          <v-flex xs12>
            <v-text-field
              label="Your phone"
              name="phone"
              type="text"
              v-model="phone"
            >
              {{ phone }}
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="onCancel"
                :disabled="localLoading"
              >
                Cancel
              </v-btn>
              <v-btn
                class="warning"
                @click="onSave"
                :loading="localLoading"
                :disabled="localLoading"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
	export default {
		props: ['ad'],
		data: () => ({
			modal: false,
			name: '',
			phone: '',
      localLoading: false
		}),
		methods: {
			onCancel() {
				this.name = '';
				this.phone = '';
				this.modal = false
			},
			onSave() {
				if (this.name !== '' && this.phone !== '') {
					this.localLoading = true;
					this.$store.dispatch('createOrder', {
						name: this.name,
						phone: this.phone,
						adId: this.ad.id,
            userId: this.ad.ownerId,
					})
					.finally(() => {
						this.name = '';
						this.phone = '';
						this.localLoading = false;
						this.modal = false
					})
				}
			}
		}
	}

</script>
