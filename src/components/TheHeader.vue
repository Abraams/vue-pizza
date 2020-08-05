<template>
  <div class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link to="/" class="header__logo">
          <img width="38" src="@/assets/img/pizza-logo.svg" alt="Pizza logo" />
          <div>
            <h1>Vue Pizza</h1>
            <p>самая реактивная пицца во вселенной</p>
          </div>
        </router-link>
        <div
          class="header__cart"
          v-if="$route.path !== '/cart'"
          :key="totalCount"
        >
          <router-link
            to="/cart"
            class="button button--cart"
            :class="{ 'button--cart-mobile': isMobile && isScrolled }"
            v-if="totalCount > 0"
          >
            <span>{{ totalPrice | currency }} ₽</span>
            <div class="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ totalCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app-header",
  data() {
    return {
      isMobile: null,
      isScrolled: null
    };
  },

  computed: {
    ...mapGetters({
      totalCount: "PRODUCTS_COUNT_IN_CART",
      totalPrice: "PRODUCTS_TOTAL_PRICE_IN_CART"
    })
  },

  methods: {
    mobileCheck() {
      this.isMobile = window.innerWidth <= 1025;
      return this.isMobile;
    },
    scrollCheck() {
      this.isScrolled = window.pageYOffset > 149;
      return this.isScrolled;
    }
  },

  mounted() {
    this.isMobile = this.mobileCheck();
    this.isScrolled = this.scrollCheck();
    window.addEventListener("resize", this.mobileCheck);
    window.addEventListener("scroll", this.scrollCheck);
  }
};
</script>