<template>
  <div class="w-screen relative">
    <Hero />

    <Shoes />

    <Hoodies />
  </div>
</template>

<script setup>
import Nav from "~/components/Nav.vue";
import Hero from "~/components/Hero.vue";
import Shoes from "../components/Shoes.vue";
import Hoodies from "~/components/Hoodies.vue";
import Footer from "~/components/Footer.vue";

definePageMeta({
  layout: "main",
});
</script>

<style lang="scss" scoped></style>
