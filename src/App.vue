<template>
	<div id="app">
		<Header />
		<div class="content">
			<router-view :catalog="catalogFromStore" :cart="cartFromStore" />
		</div>
	</div>
</template>

<script>
	import Header from "@/components/TheHeader";
	import { mapGetters } from "vuex";

	export default {
		name: "App",
		components: { Header },
		data() {
			return {
				catalog: [],
				cart: [],
			};
		},
		computed: {
			...mapGetters({
				catalogFromStore: "CATALOG",
				cartFromStore: "CART",
			}),
		},
		async mounted() {
			if (!this.catalogFromStore.length) {
				await this.$store.dispatch("FETCH_CATALOG_FROM_DB");
			}
		},
	};
</script>

<style lang="less">
	@import "./assets/css/app.css";
</style>
