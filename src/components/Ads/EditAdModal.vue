<template>
  <v-dialog
    width="400px"
    v-model="modal"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="warning mr-3"
        v-bind="attrs"
        v-on="on"
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title class="headline">Edit Ad</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout row class="ma-0">
          <v-flex xs12>
            <v-text-field
              label="Edit Title"
              name="title"
              type="text"
              v-model="editedTitle"
              required
              :rules="[ v => !!v || 'Title is required']"
            >
              {{ ad.title }}
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row class="ma-0">
          <v-flex xs12>
            <v-textarea
              label="Edit description"
              name="description"
              type="text"
              v-model="editedDescription"
              :rules="[ v => !!v || 'Description is required']"
            >
              {{ ad.description }}
            </v-textarea>
          </v-flex>
        </v-layout>
        <v-divider/>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="onCancel"
              >
                Cancel
              </v-btn>
              <v-btn
                class="warning"
                @click="onSave"
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
      editedTitle: '',
      editedDescription: ''
    }),
    created() {
			this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description
		},
		methods: {
  		onCancel() {
				this.editedTitle = this.ad.title;
				this.editedDescription = this.ad.description;
				this.modal = false
      },
      onSave() {
        if (this.editedTitle !== '' && this.editedDescription !== '') {
        	this.$store.dispatch('updateAd', {
        		title: this.editedTitle,
            description: this.editedDescription,
            id: this.ad.id
          });
        	this.modal = false
        }
      }
    }
  }

</script>
