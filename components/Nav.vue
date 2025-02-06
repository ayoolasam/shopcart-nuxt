<template>
  <div class="px-8 py-8 relative z-50 flex justify-between blocks items-center">
    <NuxtLink :to="'/'">
      <h2 class="text-primary text-3xl font-bold">Shopcart</h2>
    </NuxtLink>

    <nav class="hidden xl:flex">
      <ul class="flex gap-4 text-sm">
        <li v-for="(item, index) in nav" :key="index">{{ item.name }}</li>
      </ul>
    </nav>
    <div
      class="bg-[#f2f2f2] px-4 hidden xl:flex h-[32px] rounded-lg items-center w-[300px]"
    >
      <input
        class="h-full text-xs w-full focus:outline-none rounded-md py-[5px] placeholder:text-xs"
        placeholder="Search Product"
      />
      <i class="ri-search-line"></i>
    </div>
    <div class="gap-4 hidden xl:flex">
      <span class="flex gap-[7px] text-sm items-center">
        <i class="ri-user-line text-xl"></i> Account
      </span>
      <NuxtLink :to="'/cart'">
        <p class="flex gap-[7px] text-sm items-center relative">
          <i class="ri-shopping-cart-line text-xl"></i>
          <span
            class="bg-primary h-[20px] w-[20px] rounded-full text-xs bottom-4 left-[10px] text-white flex items-center justify-center absolute"
          >
            {{ productStore.cart.length }}
          </span>
        </p>
      </NuxtLink>
    </div>
    <div
      @click="toggleSideBar"
      class="text-3xl xl:hidden text-primary font-bold"
    >
      <i class="ri-menu-line"></i>
    </div>
  </div>
</template>

<script setup>
import SideBar from "./SideBar.vue";
const toggle = ref(false);
const emit = defineEmits(["show"]);
import { useProductStore } from "../stores/product";

const toggleSideBar = () => {
  emit("show");
};
const productStore = useProductStore();
const nav = [
  {
    name: "Deals",
    link: "/",
  },
  {
    name: "Whats New",
    link: "/shop",
  },
  {
    name: "Delivery",
    link: "/about",
  },
];
</script>

<style lang="scss" scoped></style>
