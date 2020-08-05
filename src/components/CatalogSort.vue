<template>
  <div class="sort">
    <div
      class="sort__label"
      :class="{ open: isSortlistOpen }"
      @click="isSortlistOpen = !isSortlistOpen"
    >
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      <b>Сортировка по:</b>
      <span>{{ sortList.get(sortBy) }}</span>
    </div>
    <div class="sort__popup" v-if="isSortlistOpen">
      <ul @click="changeSortParam">
        <li
          v-for="name in sortList.values()"
          :key="name"
          :class="{ active: name === sortList.get(sortBy) }"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortList: new Map([
        ["rating", "популярности"],
        ["price", "цене"],
        ["name", "алфавиту"]
      ]),
      isSortlistOpen: false
    };
  },
  computed: {
    sortBy() {
      return this.$store.getters.CURRENT_SORT_PARAM;
    }
  },
  methods: {
    changeSortParam(event) {
      const target = event.target.closest("li") || null;
      if (!target || target.classList.contains("active")) return;

      for (const key of this.sortList.entries()) {
        if (key[1] === target.textContent.trim()) {
          this.$store.dispatch("SET_CURRENT_SORT_PARAM", key[0]);
          break;
        }
      }
      this.isSortlistOpen = !this.isSortlistOpen;
    }
  }
};
</script>