import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    cart: [],
    subTotal: 0,
    totalAmount: 0,
    discountPercentage: 20,

    shipping: 500,
  }),

  getters: {},

  actions: {
    addToCart(product) {
      const isExisting = this.cart.find((item) => item._id === product._id);

      if (isExisting) return false;
      else {
        //create a new product with quantity of the product you want to buy
        this.cart.push({
          ...product,
          numOfProducts: 1,
          totalPrice: product.price,
        });
        this.updateCartTotals();
        this.calculateTotalAmount();
        return true;
      }
    },
    deleteFromCart(product) {
      this.cart = this.cart.filter((item) => item._id !== product._id);
      this.updateCartTotals();
      this.calculateTotalAmount();
    },
    clearCart() {
      this.cart = [];
      this.updateCartTotals();
      this.calculateTotalAmount();
    },
    addToExistingProduct(product) {
      const existingProduct = this.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        existingProduct.numOfProducts += 1;
        existingProduct.totalPrice =
          existingProduct.totalPrice + existingProduct.price;

        this.updateCartTotals();
        this.calculateTotalAmount();
      }
    },
    subTractFromExistingProduct(product) {
      const existingProduct = this.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        if (existingProduct.numOfProducts > 1)
          existingProduct.numOfProducts -= 1;
        existingProduct.totalPrice =
          existingProduct.totalPrice + existingProduct.price;
        this.updateCartTotals();
        this.calculateTotalAmount();
      }
    },
    updateCartTotals() {
      this.subTotal = this.cart.reduce((total, item) => {
        return total + item.price * item.numOfProducts;
      }, 0);
    },
    calculateTotalAmount() {
      this.totalAmount = this.subTotal + this.shipping;
      const discount = (this.totalAmount * this.discountPercentage) / 100;
      this.totalAmount = this.totalAmount - discount;
    },
  },
  persist: true,
});
