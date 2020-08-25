<template>
	<div>
		<SingAppBar :back="true" :title="'Sing with Latinka'"/>

		<div class="hero-singprizes" style="padding-bottom: 100px">
			<v-container>
				<div class="singbanner">BANNER</div>
			</v-container>
		</div>

		<div class="prize-list">
			<SingPrizes/>
		</div>
	</div>
</template>

<script>
import SingAppBar from "@/components/sing/SingAppBar";
import SingPrizes from "@/components/sing/SingPrizes";
export default {
	name: "SingPrizesPage",
	components: {
		SingAppBar,
		SingPrizes
	}
}
</script>

<style lang="scss">
	.hero-singprizes {
		background: #C6C6C6;
	}
	.singbanner {
		background: linear-gradient(102.55deg, #ED1CFF 13.32%, #FF1C1C 78.48%);
		border-radius: 5px;
		height: 147px;
		line-height: 147px;
		text-align: center;
		font-weight: bold;
	}
	.prize-list {
		margin-top: -100px;
	}
</style>
