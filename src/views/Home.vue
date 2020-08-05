<template>
  <div class="container">
    <div>
      <div class="content__top">
        <CatalogCategories />
        <!--  -->
        <CatalogSort v-if="catalog.length" />
      </div>
      <!--  -->
      <h2 class="content__title" v-if="catalog.length">
        {{ currentCategory }} пиццы
      </h2>
      <h2 class="content__title content__title-placeholder" v-else>
        <template>
          <content-loader
            :width="210"
            :height="35"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="200" height="30" />
          </content-loader>
        </template>
      </h2>
      <!--  -->
      <div class="content__items" v-if="!catalog.length">
        <CatalogItemPlaceholder v-for="n in 8" :key="n" />
      </div>
      <div class="content__items" v-else>
        <CatalogItem
          v-for="pizza in filteredCatalog"
          :key="pizza.name"
          :pizza="pizza"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CatalogItem from "@/components/CatalogItem";
import CatalogItemPlaceholder from "@/components/placeholders/p-CatalogItem";
import CatalogCategories from "@/components/CatalogCategories";
import CatalogSort from "@/components/CatalogSort";
import { ContentLoader } from "vue-content-loader";

import { mapGetters } from "vuex";

export default {
  name: "Home-page",
  components: {
    CatalogItem,
    CatalogCategories,
    CatalogSort,
    CatalogItemPlaceholder,
    ContentLoader
  },
  props: {
    catalog: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentCategory: "CURRENT_CATEGORY",
      productsInCart: "PRODUCTS_COUNT_IN_CART",
      cartPrice: "PRODUCTS_TOTAL_PRICE_IN_CART"
    }),
    filteredCatalog() {
      const catalog = this.catalog;

      return catalog.filter(item => {
        if (this.currentCategory === "Все") return true;
        else if (item.category === this.currentCategory) return true;
        else return false;
      });
    }
  },
  mounted() {}
};
</script>

<style>
.content__title-placeholder {
  max-width: 200px;
  max-height: 32px;
}
</style>
