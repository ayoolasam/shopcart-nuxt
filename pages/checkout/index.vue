<template>
  <div class="flex xl:flex-row flex-col w-full border-t-[1px] border-[#f2f2f2]">
    <div class="h-full flex-1 flex flex-col gap-4 py-8 px-12">
      <h1 class="font-bold text-primary text-xl">Checkout</h1>
      <p class="font-bold">Shipping Information</p>
      <div class="bg-yellow flex gap-4 w-full">
        <div
          class="h-12 border-[#f2f2f2] border-[1px] flex gap-2 text-center justify-center items-center text-sm text-gray-500 rounded-md flex-1"
        >
          <i class="ri-truck-line"></i>
          <span>Delivery</span>
        </div>
        <div
          class="h-12 rounded-md flex-1 border-[#f2f2f2] flex gap-2 text-center justify-center items-center text-sm text-gray-500 border-[1px]"
        >
          <i class="ri-box-3-line"></i>
          <span>Pick Up</span>
        </div>
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="block">Full Name</label>
        <input class="h-12 border-[#f2f2f2] border-[1px] rounded-md w-full" />
      </div>

      <div class="flex flex-col gap-[10px]">
        <label class="block">Phone Number</label>
        <input
          class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 rounded-md w-full"
          placeholder="Enter Phone Number"
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="block">Country </label>
        <input class="h-12 border-[#f2f2f2] border-[1px] rounded-md w-full" />
      </div>
      <!--  -->
      <div class="flex gap-4">
        <div class="flex flex-col gap-[10px]">
          <label class="block">City</label>
          <input
            class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 rounded-md w-full"
            placeholder="Enter City"
          />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="block">State</label>
          <input
            class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 rounded-md w-full"
            placeholder="Enter State"
          />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="block">Zip Code</label>
          <input
            class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 rounded-md w-full"
            placeholder="Enter Zip Code"
          />
        </div>
      </div>
      <!--  -->
    </div>
    <div class="h-full flex-1 flex flex-col gap-4 p-12">
      <h1 class="font-bold text-primary">Review Your Cart</h1>
      <div class="flex flex-col gap-4">
        <div
          v-for="(product, index) in productStore.cart"
          :key="index"
          class="flex text-xs gap-4"
        >
          <div class="h-[100px] w-[100px] rounded-md bg-red-400">
            <img
              v-if="productStore.cart"
              :src="product?.images[0]?.url"
              alt="product-image"
              class="w-full h-full object-center rounded-md object-cover"
            />
          </div>
          <div class="flex flex-col justify-between">
            <div>
              <p>{{ product.name }}</p>
              <p class="text-gray-400">{{ product.numOfProducts }}x</p>
            </div>

            <p>${{ product.price }}</p>
          </div>
        </div>
      </div>
      <div class="text-xs flex flex-col gap-2.5">
        <div class="flex justify-between">
          <span class="text-gray-500">subTotal</span>
          <span class="font-bold">$200</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">shipping</span>
          <span class="font-bold">200</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Discount</span>
          <span class="font-bold">200</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold">Total</span>
          <span class="font-bold">$400</span>
        </div>
      </div>
      <div
        class="bg-primary text-white text-md rounded-md flex items-center justify-center w-full h-12"
      >
        <span>Pay now</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../../stores/product";
definePageMeta({
  layout: "main",
});

const productStore = useProductStore();
</script>

<style scoped>
input {
  outline: none;
}
</style>
