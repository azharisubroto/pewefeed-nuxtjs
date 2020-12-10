<template>
	<div v-if="topthree && currentPoint > 0">
		<v-row
			no-gutters
			align="center"
			justify="center"
			:class="'mt-3 position-' + whereisme"
		>
			<template v-for="(item, i) in topthree">
				<v-col
					:cols="!item.active ? '3' : '4'"
					:class="'item-' + parseInt(i + 1)"
					:key="'topthree-' + i"
				>
					<div :class="['rankbox', item.active ? 'is_me' : 'notme']">
						<div
							class="rb-head text-center"
							:ref="item.active == true ? 'ismeloh' : 'bukan'"
						>
							{{ item.customer.ranked }}
						</div>
						<div class="rb-body">
							<v-avatar width="23" color="#000">
								<v-img :src="item.customer.avatar"></v-img>
							</v-avatar>
							<div
								class="mt-3 text-truncate text-uppercase"
								:class="[item.active ? 'text-16' : 'text-13']"
							>
								{{ item.customer.username }}
							</div>
							<div
								v-if="item.poin.grand_total > 0"
								class="mt-1 text-10"
							>
								<img
									src="/img/icons/poin-p.svg"
									style="
										vertical-align: middle;
										line-height: 1;
									"
									class="mr-1"
									width="13"
								/>
								{{ item.poin.grand_total }}
							</div>
						</div>
					</div>
				</v-col>
			</template>
		</v-row>
		<v-row v-if="withbutton" align="center" justify="center" class="mt-3">
			<v-btn @click="$router.push('/toppoin')" color="deep-orange"
				>Cek Ranking</v-btn
			>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "toppointme",
	props: ["topthree", "currentPoint", "whereisme", "withbutton"],
}
</script>

<style lang="scss">
.mainprizes {
	.v-expansion-panel-content__wrap {
		padding: 0 !important;
	}
}

.winner-name {
	border-bottom: 1px dotted #d1d1d1;
	padding-bottom: 10px;
	margin-bottom: 10px;
}

.tp-head {
	padding-left: 15px;
	position: relative;
	line-height: 40px;
	margin: 0;
	font-size: 14px;
	&:before {
		content: "";
		width: 8px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 0 5px 5px 0;
		background: #ff4200;
	}
}

.position-3 {
	.item-1 {
		.rankbox {
			.rb-body {
				padding: 10px 10px 8px;
				text-align: center;
				opacity: 0.6;
			}
		}
	}
}

.rankbox {
	background: #404040;
	color: #fff;
	border: 2px solid #afafaf;
	border-radius: 10px;
	.rb-head {
		background: #afafaf;
		color: #000;
		font-size: 16px;
		height: 35px;
		line-height: 35px;
		padding: 0;
		text-align: center;
		font-weight: bold;
	}
	.rb-body {
		padding: 25px 10px 10px;
		text-align: center;
		opacity: 0.6;
	}
}
.item-1 .rankbox:not(.is_me) {
	border-right: 0;
	border-radius: 10px 0 0 10px;
}

.is_me.rankbox {
	border-color: #ff4200;
	.rb-head {
		background: #ff4200;
		color: #fff;
		font-size: 20px;
	}
	.rb-body {
		padding: 38px 10px;
		text-align: center;
		opacity: 1;
	}
}
.item-3 .rankbox:not(.is_me) {
	border-left: 0;
	border-radius: 0 10px 10px 0;
}

.top10-head {
	background: #afafaf;
	color: #000;
	font-size: 12px;
	padding: 10px;
}

.top10-body {
	padding: 8px;
}

.gold {
	background: linear-gradient(180deg, #f3cd7e 0%, #c78345 100%) !important;
	color: #000 !important;
	margin: 10px 0;
}
.silver {
	background: linear-gradient(180deg, #efefef 0%, #939393 100%) !important;
	color: #000 !important;
	margin: 10px 0;
}
.outinebtn {
	font-size: 14px;
	border: 1px solid #000;
	border-radius: 90px;
	display: inline-block;
	height: 26px;
	line-height: 24px;
	padding: 0 5px;
	img {
		width: 10px;
		display: inline-block;
		margin-right: 5px;
	}
}
.adjustava {
	position: relative;
	top: -2px;
}
</style>
