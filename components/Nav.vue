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
    <div class="gap-6 hidden xl:flex cursor-pointer items-center">
      <!-- <span class="flex relative gap-[7px] text-sm items-center">
        <i class="ri-user-line text-xl"></i> Account
        <div class="h-[100px] w-[100px]  shadow-xl rounded-md bg-white top-[20px] absolute"></div>
      </span> -->
      <NuxtLink :to="'/cart'">
        <p class="flex gap-[7px] text-sm items-center relative">
          <i class="ri-shopping-cart-line text-xl"></i>
          <span
            v-if="productStore.cart.length > 0"
            class="bg-primary h-[20px] w-[20px] rounded-full text-xs bottom-4 left-[10px] text-white flex items-center justify-center absolute"
          >
            {{ productStore.cart.length }}
          </span>
        </p>
      </NuxtLink>
      <div
        class="flex gap-[10px] relative cursor-pointer"
        @click="showAccountTab"
      >
        <div
          v-if="accountTab"
          class="shadow-xl w-[160px] account-menu absolute left-8 rounded-md top-8 bg-white"
        >
          <ul class="w-full h-full">
            <li
              class="px-4 text-sm py-[5px] w-full h-full text-primary hover:bg-green-300 transition-all duration-500 hover:text-white flex gap-4 justify-center text-center"
              v-for="(tab, index) in account"
              :key="index"
            >
              <i :class="tab.icon"></i>
              <span class="font-bold hover:text-white">{{ tab.tab }}</span>
            </li>
          </ul>
        </div>
        <div class="h-[30px] w-[30px] rounded-full bg-primary">
          <!-- <img src="/" alt="profile-picture" /> -->
        </div>
        <div class="gap-[5px] flex items-center">
          <div class="text-xs">
            <p>Hi, Pablo</p>
            <p>Pablo Cassanova</p>
          </div>

          <i class="ri-arrow-down-s-line text-[20px] font-semibold"></i>
        </div>
      </div>
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
    name: "Shoes",
    link: "/",
  },
  {
    name: "Hoodies",
    link: "/shop",
  },
];

const account = [
  {
    tab: "Profile",
    icon: "ri-user-line",
  },
  {
    tab: "Orders",
    icon: "ri-handbag-line",
  },
];

const accountTab = ref(false);
const showAccountTab = () => {
  accountTab.value = !accountTab.value;
};

// document.addEventListener("click", (e) => {
//   if (!e.target.closest("account-menu") && accountTab.value) {
//     accountTab.value = false;
//   }
// });
</script>

<style lang="scss" scoped></style>
