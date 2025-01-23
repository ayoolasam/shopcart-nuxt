<template>
  <div class="container blocks">
    <div
      class="px-8 flex flex-col  xl:flex-row w-full py-4 gap-4 rounded-md xl:h-[300px] bg-secondary"
    >
      <div class="flex-1 flex flex-col gap-[10px] justify-center">
        <p
          class="text-4xl font-bold text-center xl:text-left text-primary max-w-[500px]"
        >
          Grab Up to 50% On Selected Items
        </p>
        <div class="justify-center flex xl:justify-start">
          <button class="px-8 py-4 font-semibold text-white bg-primary rounded-full">
            Buy Now
          </button>
        </div>
      </div>
      <div class="flex-1  bg-red-300">
        <img
          :src="heroimage"
          class="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import heroimage from "../assets/images/heros.jpg";
</script>

<style lang="scss" scoped></style>
