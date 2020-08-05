<template>
	<div class="categories">
		<ul v-if="!categories.size">
			<CatalogSortPlaceholder v-for="n in 5" :key="n" />
		</ul>
		<ul @click="changeCategory" v-else>
			<li
				:class="{
					active:
						currentCategory.toLowerCase() === category.trim().toLowerCase(),
				}"
				v-for="category in categories"
				:key="category"
			>
				{{ category }}
			</li>
		</ul>
	</div>
</template>

<script>
	import CatalogSortPlaceholder from "@/components/placeholders/p-CatalogSort";

	export default {
		components: {
			CatalogSortPlaceholder,
		},
		data() {
			return {
				currentCategory: "Все",
			};
		},
		computed: {
			categories() {
				return this.$store.getters.CATEGORIES;
			},
		},
		methods: {
			changeCategory(event) {
				const target = event.target.closest("li") || null;
				if (!target || target.classList.contains("active")) return;

				this.currentCategory = target.textContent.trim();

				this.$store.dispatch("SET_CURRENT_CATEGORY", this.currentCategory);
			},
		},
		mounted() {
			this.currentCategory = this.$store.getters.CURRENT_CATEGORY;
		},
	};
</script>
