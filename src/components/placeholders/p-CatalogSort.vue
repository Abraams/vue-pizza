<template>
	<li>
		<content-loader
			:width="132"
			:height="50"
			:speed="2"
			primaryColor="#f3f3f3"
			secondaryColor="#ecebeb"
		>
			<rect x="0" y="2" rx="20" ry="20" width="126" height="45" />
		</content-loader>
	</li>
</template>

<script>
	import { ContentLoader } from "vue-content-loader";

	export default {
		components: {
			ContentLoader,
		},
	};
</script>

<style lang="less" scoped>
	li {
		min-width: 132px;
		padding: 0 !important;
		background-color: transparent !important;
	}
</style>
