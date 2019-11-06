<template>
    <div>
        <div v-if="isLoggedIn">
            <HeaderCard />
            <HistoryComponent class="mb-12" />
        </div>
        <div v-else>
            <v-skeleton-loader
                class="mx-auto mt-5"
                type="list-item-avatar-three-line, image, article"
            ></v-skeleton-loader>
        </div>
    </div>
</template>

<script>
import HeaderCard from "@/components/member/HeaderCard";
import HistoryComponent from "@/components/member/HistoryComponent";
import UserService from '@/services/UserService';
export default {
    name: "SettingComponent",
    data: () => ({
        isLoggedIn: false
    }),
    components: {
        HeaderCard,
        HistoryComponent
    },
    methods: {
        async loginCheck() {
            this.isLoggedIn = localStorage.getItem('loggedin');
			if( this.isLoggedIn == 'false' || !this.isLoggedIn) {
				this.$router.push('/')
			}
        },
    },
    mounted() {
        this.loginCheck()
    }
}
</script>