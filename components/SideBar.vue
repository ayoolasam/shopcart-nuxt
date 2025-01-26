<template>
  <div
    :class="{ 'hidden': !sidebar }"
    class="bg-primary py-4 h-screen absolute right-0 top-0 transition-all duration-1000 w-[250px]"
  >
 
   
    <div class="flex justify-end px-4 text-white text-xl font-bold "> <i @click="emitter" class="ri-close-large-line cursor-pointer"></i></div>
    <ul class="mt-8 w-full">
      <li v-for="(item, index) in nav"  :key="index" class="w-full p-4 text-center text-xl font-bold text-white">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(["sidebar"]);
const emit = defineEmits(["close"]);
const emitter = () => {
  emit("close");
};

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
