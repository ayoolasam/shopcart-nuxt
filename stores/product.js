import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    cart: [],
  }),

  getters: {},

  actions: {
    addToCart(product) {
      this.cart.push(product);
    },
    deleteFromCart(product) {
      this.cart = this.cart.filter((item) => item._id !== product._id);
    },
    clearCart() {
      this.cart = [];
    },
  },
  persist: true,
});
