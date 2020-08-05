<template>
  <div class="pizza-block">
    <img
      class="pizza-block__image"
      :src="`https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/${pizza.tamb}`"
      alt="Pizza"
    />
    <h4 class="pizza-block__title">{{ pizza.name }}</h4>
    <div class="pizza-block__selector">
      <ul @click="changeParams('type', $event)">
        <li
          v-for="(type, index) in defaultTypes"
          :key="type"
          :class="{
            active: type === params.type,
            disabled: !typesPattern[index],
          }"
        >
          {{ type.toLowerCase() }}
        </li>
      </ul>
      <ul @click="changeParams('size', $event)">
        <li
          v-for="(size, index) in defaultSizes"
          :key="size"
          :class="{
            active: size === params.size,
            disabled: !sizesPattern[index],
          }"
        >
          {{ `${size} см.` }}
        </li>
      </ul>
    </div>
    <div class="pizza-block__bottom">
      <div class="pizza-block__price">от {{ pizza.price }} ₽</div>
      <div
        class="button button--add"
        :class="{ 'button--outline': isPizzaInCart }"
        @click="addItemToCart"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="white"
          />
        </svg>
        <span>Добавить</span>
        <i :key="pizzasInCart" v-if="isPizzaInCart > 0">{{ pizzasInCart }}</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pizza: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      defaultTypes: ["Тонкое", "Традиционное"],
      defaultSizes: [26, 30, 40],

      params: {
        type: null,
        size: null
      }
    };
  },
  computed: {
    pizzasInCart() {
      return this.$store.getters.CART_ITEMS_BY_ID(+this.pizza.id) || 0;
    },
    isPizzaInCart() {
      return this.pizzasInCart > 0 ? true : false;
    },
    typesPattern() {
      const pizzaTypes = this.pizza.params.types;

      return this.defaultTypes.map(type =>
        pizzaTypes.includes(type.toLowerCase()) ? true : false
      );
    },
    sizesPattern() {
      const pizzaSizes = this.pizza.params.sizes;

      return this.defaultSizes.map(size =>
        pizzaSizes.includes(size) ? true : false
      );
    }
  },
  methods: {
    changeParams(param, event) {
      const target = event.target.closest("li") || null;
      const targetClasses = target.classList;
      if (
        !target ||
        targetClasses.contains("active") ||
        targetClasses.contains("disabled")
      ) {
        return;
      }

      if (param === "type") {
        this.params.type = this.defaultTypes.find(type => {
          return type.toLowerCase() === target.textContent.trim();
        });
      } else {
        this.params.size = this.defaultSizes.find(size => {
          return size === parseInt(target.textContent);
        });
      }
    },
    addItemToCart() {
      this.$store.dispatch("ADD_ITEM_TO_CART", {
        id: +this.pizza.id,
        name: this.pizza.name,
        price: +this.pizza.price,
        params: this.params,
        tamb: this.pizza.tamb
      });
    }
  },
  mounted() {
    this.params.type = this.defaultTypes.filter((type, index) => {
      return !this.typesPattern[index - 1] && this.typesPattern[index]
        ? type
        : false;
    })[0];

    this.params.size = this.defaultSizes.filter((size, index) => {
      return !this.sizesPattern[index - 1] && this.sizesPattern[index]
        ? size
        : false;
    })[0];
  }
};
</script>
