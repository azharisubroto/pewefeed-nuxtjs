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

        this.$auth.fetchUser().then(() => {
            return this.$router.push('/')
        }).catch((e) => {
            this.$auth.logout()
            this.$emit('notloading', true)
            return this.$router.push('/')
        })
    }
}
</script>