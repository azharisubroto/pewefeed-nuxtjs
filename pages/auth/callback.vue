<template>
    <div>
        <v-overlay :value="true">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
export default {
    name: 'callback',
    data() {
        return {
            token: this.$route.query.token ? this.$route.query.token : null
        }
    },
    mounted() {
        this.$auth.setToken('local', 'Bearer ' + this.token)
        this.$auth.setStrategy('local')
        localStorage.setItem('loggedin', 'true')
        localStorage.setItem('access-token', this.token)
        var vm = this

        this.$auth.fetchUser().then(() => {
            var userdata = vm.$auth.user
			localStorage.setItem('userdata', JSON.stringify(userdata))
			let singredirect = localStorage.getItem('sing_to_login');
			if( singredirect != null && singredirect !== undefined ) {
				return this.$router.push('/sing/')
			} else {
				return this.$router.push('/')
			}
        }).catch((e) => {
            this.$auth.logout()
            localStorage.removeItem("loggedin");
            localStorage.removeItem("access-token");
            localStorage.removeItem("userdata");
            localStorage.removeItem("auth._token.local");
            localStorage.removeItem("auth.strategy");
            localStorage.removeItem("useres");
            this.$emit('notloading', true)
            return this.$router.push('/')
        })
    }
}
</script>
