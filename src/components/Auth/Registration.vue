<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
            >
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
                :rules="emailRules"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :counter="6"
                :rules="passwordRules"
              />

              <v-text-field
                id="confirm-password"
                label="Confirm Password"
                name="confirm-password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="confirmPassword"
                :counter="6"
                :rules="[
                	...confirmPasswordRules,
                  () => password === confirmPassword || 'Passwords must be match',
                	]"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >Create account</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
	export default {
		data: () => ({
			email: '',
			password: '',
      confirmPassword: '',
			valid: false,
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 6) || 'Password must be less than 6 characters',
			],
			confirmPasswordRules: [
				v => !!v || 'Password is required',
			]
		}),
    computed: {
			loading() {
				return this.$store.getters.loading
      }
    },
		methods: {
			onSubmit() {
				if (this.$refs.form.validate()) {
					const user = {
						email: this.email,
						password: this.password
					};
          this.$store.dispatch('createUser', user)
          .then(() => {
          	this.$router.push('/')
          })
          .catch(() => {})
				}
			}
		}
	}
</script>
