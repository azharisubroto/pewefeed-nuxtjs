<template>
	<div>
		<SingAppBar :back="true" title="Prizes" />

		<div class="hero-singprizes" style="padding-bottom: 100px">
			<v-container>
				<BannerStatic slug="sing" />
			</v-container>
		</div>

		<div class="prize-list">
			<SingPrizes />
		</div>
	</div>
</template>

<script>
import SingAppBar from "@/components/sing/SingAppBar"
import SingPrizes from "@/components/sing/SingPrizes"
import BannerStatic from "@/components/common/BannerStatic"

export default {
	name: "SingPrizesPage",
	components: {
		SingAppBar,
		SingPrizes,
		BannerStatic,
	},
}
</script>

<style lang="scss">
.hero-singprizes {
	background: #c6c6c6;
}
.singbanner {
	background: linear-gradient(102.55deg, #ed1cff 13.32%, #ff1c1c 78.48%);
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
