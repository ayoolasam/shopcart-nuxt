<template>
  <div
    class="px-8 py-8 relative z-50 border-b-[1px] border-[#f2f2f2] flex justify-between blocks items-center"
  >
    <NuxtLink :to="'/'">
      <h2 class="text-primary text-3xl font-bold">Shopcart</h2>
    </NuxtLink>

    <nav class="hidden xl:bg-red-700">
      <ul class="flex gap-4 text-sm">
        <li v-for="(item, index) in nav" :key="index">{{ item.name }}</li>
      </ul>
    </nav>
    <div
      class="bg-[#f2f2f2] px-4 relative hidden xl:flex h-[32px] rounded-lg items-center w-[300px]"
    >
      <input
        class="h-full text-xs w-full focus:outline-none rounded-md py-[5px] placeholder:text-xs"
        placeholder="Search Product"
        @input="activateToggle"
      />
      <i class="ri-search-line"></i>
      <div
        v-if="showDropdown"
        class="bg-white shadow-lg h-[200px] search-drop overflow-y-auto top-8.5 w-[400px] rounded-md absolute"
      >
        <p v-if="loading" class="text-xs p-4 text-gray-600">
          Loading..........
        </p>
        <p
          v-else
          v-for="(product, index) in products"
          :key="index"
          class="text-xs p-4 text-gray-600 hover:underline cursor-pointer hover:text-primary"
        >
          {{ product.name }}
        </p>
      </div>
    </div>
    <div class="gap-4 hidden xl:flex cursor-pointer items-center">
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
        class="relative cursor-pointer px-4 mr-8"
        @click.stop="showUserTab"
        v-if="!userLoggedIn"
      >
        <i class="ri-user-line font-bold text-sm"></i>
        <div
          v-if="userTab"
          class="shadow-xl w-[100px] user-menu absolute rounded-xl top-6 bg-white"
        >
          <ul class="w-full h-full">
            <li
              class="px-[20px] text-sm py-[5px] w-full h-full text-primary hover:bg-green-300 transition-all duration-500 hover:text-white flex gap-4 text-center"
              v-for="(tab, index) in user"
              :key="index"
            >
              <NuxtLink :to="tab.to" class="flex gap-4">
                <span class="font-bold hover:text-white">{{ tab.tab }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-else
        class="flex gap-[10px] relative cursor-pointer"
        @click.stop="showAccountTab"
      >
        <div
          v-if="accountTab"
          class="shadow-xl w-[160px] account-menu absolute left-8 rounded-xl top-8 bg-white"
        >
          <ul class="w-full h-full">
            <li
              class="px-[20px] text-sm py-[5px] w-full h-full text-primary hover:bg-green-300 transition-all duration-500 hover:text-white flex gap-4 text-center"
              v-for="(tab, index) in account"
              :key="index"
            >
              <NuxtLink :to="tab.to" class="flex gap-4">
                <i :class="tab.icon"></i>
                <span class="font-bold hover:text-white">{{ tab.tab }}</span>
              </NuxtLink>
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
import { NuxtLink } from "#components";
const { $apiClient } = useNuxtApp();
import axios from "axios";
import { useToast } from "maz-ui";

const toggleSideBar = () => {
  emit("show");
};
const showDropdown = ref(false);
const productStore = useProductStore();
const loading = ref(false);
const products = ref([]);
const userLoggedIn = ref(false);
const toast = useToast();
let searchTimeout = ref(null);

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
    to: "/user/profile",
  },
  {
    tab: "Orders",
    icon: "ri-handbag-line",
    to: "/user/orders",
  },
];
const user = [
  {
    tab: "Login",

    to: "Login",
  },
  {
    tab: "Register",

    to: "Register",
  },
];
const activateToggle = () => {
  showDropdown.value = true;
  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    listProducts();
  }, 500);
};

const accountTab = ref(false);
const showAccountTab = () => {
  accountTab.value = !accountTab.value;
};
const userTab = ref(false);
const showUserTab = () => {
  userTab.value = !userTab.value;
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest("account-menu") && accountTab.value) {
      accountTab.value = false;
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("search-drop") && showDropdown.value) {
      showDropdown.value = false;
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("user-menu") && userTab.value) {
      userTab.value = false;
    }
  });
});

const listProducts = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get("/api/v1/products");
    if (response) {
      products.value = response.data.data.products;
      loading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};
</script>

<style lang="scss" scoped></style>
