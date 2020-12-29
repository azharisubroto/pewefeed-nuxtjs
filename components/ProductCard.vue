<template>
	<v-card
		outlined
		style="border: 1px solid #bababa"
		:to="to != null ? to : ''"
	>
		<div
			:class="[dense ? 'px-3 py-2 text-12' : 'px-3 py-3 text-14']"
			style="background: #404040"
		>
			{{ title && title }}

			<div class="head-right">
				<slot name="head-right"></slot>
			</div>
		</div>

		<slot></slot>
	</v-card>
</template>

<script>
export default {
	props: ["title", "to", "dense"],
}
</script>

<style lang="scss" scoped>
div {
	position: relative;
}
.head-right {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 15px;
	width: auto;
	display: block;
}
</style>
