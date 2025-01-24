<template>
  <div class="flex flex-col">
    <Nav />
    <slot></slot>
    <Footer />
  </div>
</template>

<script setup>
import Nav from "~/components/Nav.vue";
import Footer from "~/components/Footer.vue";
</script>

<style lang="scss" scoped></style>
