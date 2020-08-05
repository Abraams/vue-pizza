export default {
	state: {
		cart: [],
		productsInCart: 0,
		totalPrice: 0,
	},
	mutations: {
		ADD_ITEM_TO_CART(state, product) {
			const cart = [...state.cart];

			const idx = cart.findIndex(
				(i) =>
					i.id === product.id &&
					i.params.type === product.params.type &&
					i.params.size === product.params.size
			);
			if (idx === -1) {
				const newItem = {
					id: product.id,
					name: product.name,
					count: 1,
					price: product.price,
					tamb: product.tamb,
					params: {
						type: product.params.type,
						size: product.params.size,
					},
				};
				cart.push(newItem);
			} else {
				const updatedItem = {
					...cart[idx],
					count: cart[idx].count + 1,
				};

				cart[idx] = updatedItem;
			}

			state.cart = cart;
			state.productsInCart++;
			state.totalPrice += product.price;
		},
		REMOVE_ITEM_FROM_CART(state, product) {
			let cart = [...state.cart];

			const idx = cart.findIndex(
				(i) =>
					i.id === product.id &&
					i.params.type === product.params.type &&
					i.params.size === product.params.size
			);
			if (idx === -1) return;

			if (cart[idx].count - 1 > 0) {
				cart[idx].count--;
			} else {
				cart = cart.filter((i) => i !== cart[idx]);
			}

			state.cart = cart;
			state.productsInCart--;
			state.totalPrice -= product.price;
		},
		DELETE_ITEM_FROM_CART(state, product) {
			let cart = [...state.cart];

			const idx = cart.findIndex(
				(i) =>
					i.id === product.id &&
					i.params.type === product.params.type &&
					i.params.size === product.params.size
			);
			if (idx === -1) return;
			cart = cart.filter((i) => i !== cart[idx]);

			state.cart = cart;
			state.productsInCart -= product.count;
			state.totalPrice -= product.price * product.count;
		},
		CLEAR_CART(state) {
			state.cart = [];
			state.productsInCart = 0;
			state.totalPrice = 0;
		},
	},
	actions: {
		ADD_ITEM_TO_CART({ commit }, item) {
			commit("ADD_ITEM_TO_CART", item);
		},
		REMOVE_ITEM_FROM_CART({ commit }, item) {
			commit("REMOVE_ITEM_FROM_CART", item);
		},
		DELETE_ITEM_FROM_CART({ commit }, item) {
			commit("DELETE_ITEM_FROM_CART", item);
		},
		CLEAR_CART({ commit }) {
			commit("CLEAR_CART");
		},
	},
	getters: {
		CART: (s) => s.cart,
		PRODUCTS_COUNT_IN_CART: (s) => s.productsInCart,
		PRODUCTS_TOTAL_PRICE_IN_CART: (s) => s.totalPrice,
		CART_ITEMS_BY_ID: (s) => (id) => {
			let countOfItems = 0;
			const items = s.cart.filter((item) => item.id === id);
			items.forEach((i) => (countOfItems += i.count));

			return countOfItems;
		},
	},
};
