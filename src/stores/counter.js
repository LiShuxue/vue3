import { defineStore } from 'pinia';

export const useStore = defineStore('my-store', {
  state: () => ({
    name: 'me',
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
