import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    cart: [],
    subTotal: 0,
  }),

  getters: {},

  actions: {
    addToCart(product) {
      const isExisting = this.cart.find((item) => item._id === product._id);

      if (isExisting) return false;
      else {
        //create a new product with quantity of the product you want to buy
        this.cart.push({ ...product, numOfProducts: 1 });
        this.updateCartTotals();
        return true;
      }
    },
    deleteFromCart(product) {
      this.cart = this.cart.filter((item) => item._id !== product._id);
      this.updateCartTotals();
    },
    clearCart() {
      this.cart = [];
      this.updateCartTotals();
    },
    addToExistingProduct(product) {
      const existingProduct = this.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        existingProduct.numOfProducts += 1;
        this.updateCartTotals();
      }
    },
    subTractFromExistingProduct(product) {
      const existingProduct = this.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        if (existingProduct.numOfProducts > 1)
          existingProduct.numOfProducts -= 1;
        this.updateCartTotals();
      }
    },
    updateCartTotals() {
      this.subTotal = this.cart.reduce((total, item) => {
        return total + item.price * item.numOfProducts;
      }, 0);
    },
  },
  persist: true,
});
