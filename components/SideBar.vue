<template>
  <div class="modal-overlay xl:hidden md:hidden">
    <div
      class="bg-primary py-4 h-full absolute right-0 top-0 transition-all duration-1000 w-[270px]"
    >
      <div class="flex justify-end px-4 text-white text-xl font-bold">
        <i @click="emitter" class="ri-close-large-line cursor-pointer"></i>
      </div>
      
      <ul v-if=" userStore.userData && Object.keys(userStore.userData).length > 0 " class="mt-8 w-full">
        <li
          v-for="(item, index) in nav"
          :key="index"
          class="w-full p-4 text-center text-xl font-bold text-white"
        >
          <NuxtLink :to="item.link">
            <span>{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
      <ul v-else class="mt-8 w-full">
        <li
          v-for="(item, index) in navnotLogged"
          :key="index"
          class="w-full p-4 text-center text-xl font-bold text-white"
        >
          <NuxtLink :to="item.link">
            <span>{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "#imports";

const props = defineProps(["sidebar"]);
const emit = defineEmits(["close"]);
const emitter = () => {
  emit("close");
};
const userStore = useUserStore();
const nav = [
  {
    name: " Profile",
    link: "/user/profile",
  },
  {
    name: "Orders",
    link: "/user/orders",
  },
  {
    name: "LogOut",
    link: "/",
  },
];
const navnotLogged = [
  {
    name: "Login",
    link: "/Login",
  },
  {
    name: "Register",
    link: "/Register",
  },
];
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
