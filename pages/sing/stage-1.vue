<template>
	<section class="sing">
		<SingAppBar title="STAGE 1 : AUDISI" :back="true"/>

		<StageContent title="STAGE 1: Audisi ini berakhir tanggal 31 Mei 2020"/>
	</section>
</template>

<script>

import SingAppBar from "@/components/sing/SingAppBar";
import StageContent from "@/components/sing/StageContent";
export default {
	name:"Sing",
	components: {
		StageContent,
		SingAppBar
	},
}
</script>

<style lang="scss">
	.sing {
		iframe {
			width: 100%;
			height: 300px;
		}
	}
	.pesertalist {
		border-bottom: 3px solid #d1d1d1;
		padding: 30px 0;
		// &:first-of-type {
		// 	//padding-top: 0;
		// }
	}
</style>
