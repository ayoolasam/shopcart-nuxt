<template>
  <div class="flex flex-col">
    <Nav @show="toggleSideBar" />
    <SideBar v-if="toggle" @close="toggleSideBar" />
    <slot></slot>
    <Footer />
  </div>
</template>

<script setup>
import Nav from "~/components/Nav.vue";
import Footer from "~/components/Footer.vue";
import SideBar from "~/components/SideBar.vue";

const toggle = ref(false);

const toggleSideBar = () => {
  toggle.value = !toggle.value;
};
</script>

<style lang="scss" scoped></style>
