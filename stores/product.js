import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    cart: [],
  }),

  getters: {},

  actions: {
    addToCart(product) {
      const isExisting = this.cart.find((item) => item._id === product._id);

      if (isExisting) return false;
      else {
        //create a new product with quantity of the product you want to buy
        this.cart.push({ ...product, numOfProducts: 1 });
        return true;
      }
    },
    deleteFromCart(product) {
      this.cart = this.cart.filter((item) => item._id !== product._id);
    },
    clearCart() {
      this.cart = [];
    },
    addToExistingProduct(product) {
      const existingProduct = this.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        existingProduct.numOfProducts += 1;
      }
    },
    subTractFromExistingProduct(product) {
      const existingProduct = this.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        if (existingProduct.numOfProducts > 1)
          existingProduct.numOfProducts -= 1;
      }
    },
  },
  persist: true,
});
