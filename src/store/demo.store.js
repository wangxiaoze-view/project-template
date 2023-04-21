import { defineStore } from 'pinia';

export const DemoStore = defineStore('DemoStore', {
  state: () => ({
    count: 0,
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    SET_COUNT(count) {
      this.count = count;
    },
  },
});
