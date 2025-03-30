<template>
  <div class="py-4 px-8 z-0  relative bg-secondary">
    <div
      class="px-8 flex flex-col xl:flex-row md:flex-row w-full py-4 gap-4 justify-center rounded-md xl:h-[300px]"
    >
      <div class="flex-1 w-full flex flex-col gap-[10px] justify-center">
        <p
          class="text-4xl w-full font-bold text-center md:text-left xl:text-left text-primary md:max-w-[500px] xl:max-w-[500px]"
        >
          Grab Up to 20% On Selected Items
        </p>
        <div class="justify-center md:justify-start flex xl:justify-start">
        
            <button
            @click="emit('shoe')"
            class="px-8 py-4 font-semibold active:outline-none text-white bg-primary rounded-full"

          >
            Buy Now
          </button>
       
         
        </div>
      </div>
      <div class="flex-1 bg-red-300">
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

const emit = defineEmits("shoe")


</script>

<style lang="scss" scoped></style>
