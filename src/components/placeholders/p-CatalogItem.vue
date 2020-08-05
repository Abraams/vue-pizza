<template>
	<div class="pizza-block">
		<content-loader
			:width="280"
			:height="440"
			:speed="3"
			primaryColor="#f3f3f3"
			secondaryColor="#ecebeb"
		>
			<circle cx="138" cy="125" r="125" />
			<rect x="5" y="262" rx="4" ry="4" width="270" height="24" />
			<rect x="5" y="302" rx="3" ry="3" width="270" height="82" />
			<rect x="5" y="406" rx="3" ry="3" width="90" height="24" />
			<rect x="144" y="395" rx="14" ry="14" width="130" height="42" />
		</content-loader>
	</div>
</template>

<script>
	import { ContentLoader } from "vue-content-loader";

	export default {
		components: {
			ContentLoader,
		},
	};
</script>
