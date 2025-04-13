<template>
  <div class="modal-overlay xl:hidden md:hidden">
    <div
      class="bg-primary cursor-pointer py-4 h-full absolute right-0 top-0 transition-all duration-1000 w-[270px]"
    >
      <div class="flex justify-end px-4 text-white text-xl font-bold">
        <i @click="emitter" class="ri-close-large-line cursor-pointer"></i>
      </div>

      <ul
        v-if="userStore.userData && Object.keys(userStore.userData).length > 0"
        class="mt-8 w-full"
      >
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
      <ul>
        <li
          @click="toggleCtaModal"
          class="w-full p-4 text-center text-xl font-bold text-white"
        >
          <span>Log Out</span>
        </li>
      </ul>
    </div>
    <CtaModal
      Heading="Log Out"
      sub="Are you sure you want to Log Out"
      miniSub="You can Always Come Back Later"
      v-if="showCtaModal"
      @closeModal="closeCtaModal"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "#imports";
import CtaModal from "./ctaModal.vue";

const props = defineProps(["sidebar"]);
const showCtaModal = ref(false);
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
  // {
  //   name: "Cart",
  //   link: "/cart",
  // },
  {
    name: "Orders",
    link: "/user/orders",
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

const toggleCtaModal = () => {
  showCtaModal.value = true;
};

const closeCtaModal = () => {
  showCtaModal.value = false;
  emitter("close");
};
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
