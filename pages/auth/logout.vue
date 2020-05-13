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

        this.$router.push('/')
    }
}
</script>