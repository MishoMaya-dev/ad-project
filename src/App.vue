<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.name"
          :to="link.url"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="logout"
          v-if="isUserLoggedIn"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      >

      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="pointer"
        >Ad application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.name"
          :to="link.url"
          text
          x-large
        >
          <v-icon left>mdi-{{ link.icon }}</v-icon>
          {{ link.name }}
        </v-btn>
        <v-btn
          @click="logout"
          v-if="isUserLoggedIn"
          text
          x-large
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn
          text
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
	export default {
		data: () => ({
			drawer: false,
		}),
    computed: {
			error() {
				return this.$store.getters.error
			},
			isUserLoggedIn() {
				return this.$store.getters.isUserLoggedIn
			},
			links() {
				if (this.isUserLoggedIn) {
					return [
						{name: 'Orders', icon: 'cart-arrow-right', url: '/orders'},
						{name: 'New Ad', icon: 'text-box-plus-outline', url: '/new'},
						{name: 'My Ads', icon: 'text-box-check-outline', url: '/list'},
					]
				}
				return [
					{name: 'Login', icon: 'login', url: '/login'},
					{name: 'Registration', icon: 'account-multiple-plus', url: '/registration'},
				]
			}
		},
    methods: {
			closeError() {
				this.$store.dispatch('clearError')
      },
      logout() {
				this.$store.dispatch('logoutUser');
        this.$router.push('/login')
      }
    },
		created() {
			this.$vuetify.theme.dark = true
		},
	}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
