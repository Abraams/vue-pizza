import firebase from "firebase/app";

export default {
	state: {
		catalog: [],
		categories: [],
		currentCategory: "Все",
		sortBy: "rating",
	},
	mutations: {
		SET_CATALOG(state, catalog) {
			state.catalog = catalog;
		},
		SET_CATEGORIES(state) {
			const set = new Set();
			set.add("Все");

			state.catalog.forEach((item) => {
				set.add(item.category);
			});

			state.categories = set;
		},
		SET_CURRENT_CATEGORY(state, category) {
			state.currentCategory = category;
		},
		SET_CURRENT_SORT_PARAM(state, sortBy) {
			state.sortBy = sortBy;
		},
	},
	actions: {
		async FETCH_CATALOG_FROM_DB({ commit }) {
			try {
				const catalog =
					(
						await firebase
							.database()
							.ref(`/catalog`)
							.once("value")
					).val() || [];

				const cat = Object.keys(catalog).map((key) => ({
					...catalog[key],
					id: key,
				}));

				commit("SET_CATALOG", cat);
				commit("SET_CATEGORIES");
			} catch (e) {
				console.error(e);
				throw e;
			}
		},
		SET_CURRENT_CATEGORY({ commit }, category) {
			commit("SET_CURRENT_CATEGORY", category);
		},
		SET_CURRENT_SORT_PARAM({ commit }, sortBy) {
			commit("SET_CURRENT_SORT_PARAM", sortBy);
		},
	},
	getters: {
		CATALOG: (s) => {
			return s.catalog.sort((a, b) => {
				if (s.sortBy === "rating") {
					if (a[s.sortBy] > b[s.sortBy]) return -1;
					if (a[s.sortBy] < b[s.sortBy]) return 1;
					if (a[s.sortBy] === b[s.sortBy]) return 0;
				} else {
					if (a[s.sortBy] < b[s.sortBy]) return -1;
					if (a[s.sortBy] > b[s.sortBy]) return 1;
					if (a[s.sortBy] === b[s.sortBy]) return 0;
				}
			});
		},
		CATEGORIES: (s) => s.categories,
		CURRENT_CATEGORY: (s) => s.currentCategory,
		CURRENT_SORT_PARAM: (s) => s.sortBy,
	},
};
