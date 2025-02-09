<template>
  <div
    class="xl:h-screen w-full flex flex-col xl:flex-row gap-4 py-8 px-4 md:flex-row bg-[#f2f2f2]"
  >
    <div
      class="xl:h-[500px] w-full overflow-y-auto bg-white rounded-2xl container md:w-[70%] xl:w-[70%]"
    >
      <h1 class="text-2xl font-bold py-4 border-b-[1px] border-[#f6f6f6]">
        Cart
      </h1>

      <div v-if="productStore.cart.length === 0" class="mt-8">
        No Products In Cart Yet
      </div>

      <div
        v-else
        v-for="(product, index) in productStore.cart"
        :key="index"
        class="w-full text-xs xl:text-sm flex flex-col gap-4 md:gap-0 md:flex-row md:text-sm xl:gap-0 justify-between xl:flex-row px-4 py-4 border-b-[1px] border-[#f6f6f6]"
      >
        <div class="flex md:flex-row flex-col xl:flex-row gap-4">
          <div
            class="md:h-[100px] xl:h-[100px] h-[100px] sm:h-[150px] xl:w-[200px] md:w-[180px] w-full"
          >
            <img
              :src="product.images[0].url"
              class="object-cover h-full w-full rounded-lg object-center"
              alt=""
            />
          </div>
          <div
            class="flex cursor-pointer xl:flex-col md:flex-col w-full justify-between md:justify-normal xl:justify-normal md:28 xl:w-32 flex-row gap-6"
          >
            <div>
              <p>{{ product.name }}</p>
              <div class="text-xs text-gray-300">
                <span>${{ product.price }}</span> |
                <span class="text-green-400">In Stock</span>
              </div>
            </div>

            <div
              class="h-[30px] flex justify-between items-center rounded-lg w-[80px] px-4 bg-[#f6f6f6]"
            >
              <i
                @click="productStore.addToExistingProduct(product)"
                class="ri-add-line"
              ></i>
              <span class="text-xs">{{ product.numOfProducts }}</span>
              <i
                @click="productStore.subTractFromExistingProduct(product)"
                class="ri-subtract-line"
              ></i>
            </div>
          </div>
        </div>
        <!--  -->
        <div
          class="flex xl:flex-col cursor-pointer md:flex-col justify-between items-center xl:items-end"
        >
          <p class="text-xl font-bold">${{ product.totalPrice }}</p>

          <div
            @click="deleteFromCart(product)"
            class="px-4 xl:px-12 bg-[#f6f6f6] text-primary hover:bg-primary hover:text-white py-4 rounded-md flex items-center gap-4"
          >
            <i class="ri-delete-bin-7-fill"></i> <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cursor-pointer w-full xl:w-[400px] md:w-[400px] p-4 bg-white h-[200px] flex flex-col justify-between shadow-md rounded-md"
    >
      <div class="gap-2 flex flex-col">
        <p class="font-semibold">Cart Summary</p>
        <div class="flex items-center justify-between">
          <span>SubTotal</span>
          <span>${{ productStore.subTotal }}</span>
        </div>
        <p class="text-gray-400 text-xs">Delivery Fees Not Included Yet</p>
      </div>
      <NuxtLink to="/checkout">
        <div
          class="h-[50px] w-full shadow-md text-white flex items-center justify-center rounded-md bg-primary"
        >
          Checkout ${{ productStore.subTotal }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import shoe from "../../assets/images/3.jpg";
import { useProductStore } from "../../stores/product";

const productStore = useProductStore();
definePageMeta({
  layout: "main",
});

const deleteFromCart = (product) => {
  productStore.deleteFromCart(product);
};
</script>

<style lang="scss" scoped></style>
