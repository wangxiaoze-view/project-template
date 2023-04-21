import { defineStore } from 'pinia';

export const AppStore = defineStore('AppStore', {
  state: () => ({
    isQuestLoading: false,
  }),

  getters: {},

  actions: {
    SET_QUEST_LOADING(loading) {
      this.isQuestLoading = loading;
    },
  },
});
