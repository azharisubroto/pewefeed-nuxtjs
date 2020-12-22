<template>
	<v-card outlined style="border: 1px solid #fff" :to="to != null ? to : ''">
		<div class="px-3 py-3" style="background: #404040">
			{{ title && title }}
		</div>

		<slot></slot>
	</v-card>
</template>

<script>
export default {
	props: ["title", "to"],
}
</script>
