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
    mounted() {
        var self = this
        this.$auth.logout()
        localStorage.removeItem("loggedin");
        localStorage.removeItem("access-token");
        localStorage.removeItem("userdata");
        localStorage.removeItem("auth._token.local");
        localStorage.removeItem("auth.strategy");
        localStorage.removeItem("useres");

        this.$router.push('/')
    }
}
</script>