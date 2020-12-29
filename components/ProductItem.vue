<template>
	<div class="item-detail" :class="[dense ? 'dense' : '']">
		<v-row>
			<v-col cols="6">
				{{ label }}
			</v-col>
			<v-col cols="6" class="text-right">
				{{ detail }}
				<slot name="action"></slot>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "ProductItem",
	props: ["label", "detail", "dense"],
}
</script>

<style lang="scss" scoped>
.item-detail {
	padding: 10px 15px;
	border-bottom: 1px solid #bababa;
	font-size: 12px;
	&.dense {
		padding: 0 15px;
	}
}
</style>
