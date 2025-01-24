<template>
  <div class="container flex justify-between blocks items-center">
    <h2 class="text-primary text-3xl font-bold">Shopcart</h2>
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
        <span class="flex gap-[7px] text-sm items-center">
          <i class="ri-shopping-cart-line text-xl"></i>Cart</span
        >
      </NuxtLink>
    </div>
    <div class="text-3xl xl:hidden text-primary font-bold">
      <i class="ri-menu-line"></i>
    </div>
  </div>
</template>

<script setup>
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
