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
      class="bg-[#f2f2f2] px-4 relative hidden xl:flex md:flex sm:flex h-[32px] rounded-lg items-center w-[300px]"
    >
      <input
        class="h-full text-xs w-full focus:outline-none rounded-md py-[5px] placeholder:text-xs"
        placeholder="Search Product"
        @input="activateToggle"
        v-model="search"
      />
      <i class="ri-search-line"></i>
      <div
        v-if="showDropdown"
        class="bg-white shadow-lg  search-drop overflow-y-auto top-8.5 w-[400px] rounded-md absolute"
      >
        <p v-if="loading" class="text-xs p-4 text-gray-600">
          Loading..........
        </p>
        <p
          v-if="!loading && products.length === 0"
          class="text-xs p-4 text-gray-600"
        >
          No Products Found
        </p>
        <p
          v-else
          v-for="(product, index) in products"
          :key="index"
          class="text-xs p-4 text-gray-600 hover:underline cursor-pointer hover:text-primary"
        >
          <NuxtLink :to="`/products/${product._id}`">
            {{ product.name }}
          </NuxtLink>
        </p>
      </div>
    </div>
    <div class="gap-4 hidden xl:flex cursor-pointer items-center">
    
      <NuxtLink :to="'/cart'">
        <p class="flex gap-[7px] text-sm items-center relative">
          <i class="ri-shopping-cart-line text-xl font-bold text-primary"></i>
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
        v-if="
          userStore.userData && Object.keys(userStore.userData).length === 0
        "
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
          class="shadow-xl w-[160px] account-menu absolute left-8 rounded-xl top-10 bg-white"
        >
          <ul class="w-full h-full rounded-xl">
            <li
              class="px-[20px] text-sm py-[5px] w-full first:rounded-t-xl last:rounded-b-xl h-full text-primary hover:bg-green-300 transition-all duration-500 hover:text-white flex gap-4 text-center"
              v-for="(tab, index) in account"
              :key="index"
            >
              <NuxtLink :to="tab.to" class="flex gap-4">
                <i :class="tab.icon"></i>
                <span class="font-bold hover:text-white">{{ tab.tab }}</span>
              </NuxtLink>
            </li>
            <li
              @click="showCtaModal = true"
              class="px-[20px] hover:rounded-b-xl text-sm py-[5px] w-full h-full text-primary hover:bg-green-300 transition-all duration-500 hover:text-white flex gap-4 text-center"
            >
              <i class="ri-logout-box-r-line icon"></i>
              <span class="font-bold hover:text-white">Log Out</span>
            </li>
          </ul>
        </div>
        <div v-if="userStore.userData">
          <span
            v-if="!userStore.userData.avatar"
            class="border-[1px] border-[#f2f2f2] h-[40px] text-xs flex items-center justify-center w-[40px] rounded-full"
            >{{
              userStore?.userData?.FirstName
                ? userStore.userData.FirstName[0]
                : ""
            }}{{
              userStore?.userData?.LastName
                ? userStore.userData.LastName[0]
                : ""
            }}</span
          >
          <div v-else class="h-[40px] w-[40px] rounded-full">
            <img
              :src="userStore.userData.avatar"
              alt="profile-picture"
              class="object-cover object-center h-full w-full rounded-full"
            />
          </div>
        </div>
        <div class="gap-[5px] flex items-center">
          <div class="text-xs">
            <p>{{ userStore.userData.FirstName }}</p>
            <p>
              {{ userStore.userData.FirstName }}
              {{ userStore.userData.LastName }}
            </p>
          </div>

          <i
            v-if="userStore.userData"
            class="ri-arrow-down-s-line text-[20px] font-semibold"
          ></i>
        </div>
      </div>
    </div>
    <div class="flex items-center xl:hidden gap-4 font-bold text-primary">
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
        @click="toggleSideBar"
        class="text-3xl xl:hidden text-primary font-bold"
      >
        <i class="ri-menu-line"></i>
      </div>
    </div>
  </div>
  <ctaModal
    Heading="Log Out"
    sub="Are you sure you want to Log Out"
    miniSub="You can Always Come Back Later"
    v-if="showCtaModal"
    @closeModal="showCtaModal = false"
  />
</template>

<script setup>
const emit = defineEmits(["show"]);
import { useProductStore } from "../stores/product";
import { NuxtLink } from "#components";
const { $apiClient } = useNuxtApp();
import { useUserStore } from "#imports";

import { useToast } from "maz-ui";
import ctaModal from "./ctaModal.vue";
import { useRouter } from "vue-router";

const toggleSideBar = () => {
  emit("show");
};

const router = useRouter();
const userStore = useUserStore();
const showDropdown = ref(false);
const showCtaModal = ref(false);
const productStore = useProductStore();
const loading = ref(false);
const products = ref([]);
const toast = useToast();
let searchTimeout = ref(null);
const search = ref("");

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

    to: "/Login",
  },
  {
    tab: "Register",

    to: "/Register",
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

const listProducts = async () => {
  try {
    if (search.value === "") {
      products.value = [];
      showDropdown.value = false;
      return;
    }
    loading.value = true;
    const response = await $apiClient.get(
      `/api/v1/products?keyword=${search.value}`
    );
    if (response) {
      products.value = response.data.data.products;
      router.push({ query: { keyword: search.value } });
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
</script>

<style lang="scss" scoped></style>
