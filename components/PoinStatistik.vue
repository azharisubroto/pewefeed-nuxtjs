<template>
	<div>
		<ProductCard title="Total Poin Keseluruhan">
			<ProductItem label="Total Poin" :detail="$auth.user.point_total" />
			<ProductItem
				label="Total Poin Ditukar"
				:detail="$auth.user.point_total_redeem"
			/>
			<ProductItem
				label="Total Poin Dihapus"
				:detail="$auth.user.point_total_invalid"
			/>
		</ProductCard>

		<div class="mb-4"></div>

		<!-- Total Poin Bulan Ini -->
		<ProductCard title="Total Poin Bulan Ini">
			<ProductItem
				label="Total Poin"
				:detail="$auth.user.point_total_monthly"
			/>
			<ProductItem
				label="Total Poin Ditukar"
				:detail="$auth.user.point_total_redeem_monthly"
			/>
			<ProductItem
				label="Total Poin Dihapus"
				:detail="$auth.user.point_total_invalid_monthly"
			/>
		</ProductCard>
	</div>
</template>

<script>
import ProductCard from "@/components/ProductCard"
import ProductItem from "@/components/ProductItem"
export default {
	name: "PoinStatistik",
	components: {
		ProductCard,
		ProductItem,
	},
}
</script>
