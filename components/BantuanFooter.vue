<template>
	<div>
		<section style="background: #ffe4db" class="py-4">
			<v-container>
				<h4 class="pw-title black--text">Social Media</h4>
				<v-row class="mt-5">
					<v-col cols="6">
						<v-card
							color="#2E3A59"
							dark
							elevation="0"
							class="py-2 px-2"
							href="https://www.instagram.com/pewefeed"
							target="_BLANK"
						>
							<div
								style="font-size: 0.875rem"
								class="d-flex align-center"
							>
								<v-icon class="mr-1">mdi-instagram</v-icon>
								<div>pewefeed</div>
							</div>
						</v-card>
					</v-col>
					<v-col cols="6">
						<v-card
							color="#2E3A59"
							dark
							elevation="0"
							class="py-2 px-2"
							href="https://www.facebook.com/pewefeeds"
							target="_BLANK"
						>
							<div
								style="font-size: 0.875rem"
								class="d-flex align-center"
							>
								<v-icon class="mr-1">mdi-facebook</v-icon>
								<div>pewefeed</div>
							</div>
						</v-card>
					</v-col>
					<v-col cols="6">
						<v-card
							color="#2E3A59"
							dark
							elevation="0"
							href="https://twitter.com/pewefeed"
							target="_BLANK"
							class="py-2 px-2"
						>
							<div
								style="font-size: 0.875rem"
								class="d-flex align-center"
							>
								<v-icon class="mr-1">mdi-twitter</v-icon>
								<div>pewefeed</div>
							</div>
						</v-card>
					</v-col>
					<v-col cols="6">
						<v-card
							color="#2E3A59"
							dark
							elevation="0"
							class="py-2 px-2"
							href="https://www.youtube.com/channel/UCW7zo9pK4Vgd2xf68ayXlPw"
							target="_BLANK"
						>
							<div
								style="font-size: 0.875rem"
								class="d-flex align-center"
							>
								<v-icon class="mr-1">mdi-youtube</v-icon>
								<div>pewefeed</div>
							</div>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<section style="background: #1c1c1c" class="py-4 white--text">
			<v-container>
				<h4 class="pw-title white--text">Hubungi Kami</h4>

				<v-row class="mt-5" no-gutters>
					<v-col cols="6" class="pr-1">
						<a href="telp:02129385381">
							<img
								src="/img/help-telp.svg"
								loading="lazy"
								alt=""
							/>
						</a>
					</v-col>
					<v-col cols="6" class="pl-1">
						<a href="https://wa.me/6281519060929" target="_BLANK">
							<img src="/img/help-wa.svg" loading="lazy" alt="" />
						</a>
					</v-col>
					<v-col cols="12" class="pt-1">
						<a href="mailto:halo@pewefeed.com">
							<img
								src="/img/help-email.svg"
								loading="lazy"
								alt=""
							/>
						</a>
					</v-col>
				</v-row>

				<div class="mt-5">
					<img
						src="/img/bantuan-footer.svg"
						style="width: 100%"
						loading="lazy"
						alt=""
					/>
				</div>
			</v-container>
		</section>
	</div>
</template>

<script>
export default {
	name: "BantuanFooter",
}
</script>

<style lang="scss" scoped>
.pw-title {
	padding-left: 30px;
	position: relative;
	font-weight: bold;
	color: #000;
	line-height: 20px;
	&:before {
		content: "";
		width: 20px;
		height: 20px;
		left: 0;
		background: #ff4200;
		position: absolute;
		border-radius: 90px;
	}
}
</style>
