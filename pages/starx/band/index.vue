<template>
	<StarxBand />
</template>

<script>
import StarxBand from "@/components/starx/StarxBand"

export default {
	props: ["colors"],
	components: {
		StarxBand,
	},
	data() {
		return {
			reactive: true,
		}
	},
}
</script>
