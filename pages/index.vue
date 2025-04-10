<template>
  <div class="w-full">
    <Hero id="hero" @shoe="scrollToFooter" />

    <Shoes id="shoes" />

    <!-- <Hoodies id="hoodies" /> -->
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

const scrollToFooter = () => {
  document.getElementById("shoes")?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped></style>
