<template>
  <section class=" mx-auto container   gap-8">
    <h2 class="text-3xl font-bold">Hoodies</h2>
    
    <div
      class="w-full p-4 rounded-md  grid grid-cols-1  place-items-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="(hoodie, index) in hoodies"
        :key="index"
        class="h-[500px] blocks max-w-[300px] flex flex-col gap-[10px]"
      >
        <div class="bg-#f2f2f2">
          <img :src="hoodie.image" alt="shoe" class="h-full w-full rounded-lg" />
        </div>
        <div v-if="hoodie" class="flex flex-col gap-2">
          <div class="flex justify-between text-center text-sm font-bold">
            <span>{{ hoodie.name }}</span> <span>${{ hoodie.price }}</span>
          </div>
          <p class="text-gray-700 text-[8px]">{{ hoodie.description }}</p>
          <p  class="flex items-center">
            <ClientOnly>
              <NuxtRating  :rating-value="hoodie.ratingValue"/>
            </ClientOnly>
           <span class="text-[8px]">({{ hoodie.ratings }})</span></p> 
          <button
            class="border-[1px] text-xs border-[#b9b9b9] w-[120px] py-2 text-black rounded-full hover:bg-primary hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
   
  </section>

</template>

<script setup>
import hoodie from "../assets/images/hoodie1.jpg";
import hoodie2 from "../assets/images/hoodie2.jpg";
import hoodie3 from "../assets/images/hoodie3.jpg";
import hoodie4 from "../assets/images/hoodie4.jpg";
import { NuxtRating } from "#components";

const hoodies = [
  {
    name: "Classic Pullover Hoodie",
    price: 45,
    description: "A comfortable pullover hoodie made with soft cotton fleece.",
    image: hoodie,
    ratingValue:2.5,
    ratings:123
  },
  {
    name: "Zip-Up Hoodie",
    price: 50,
    description: "A lightweight zip-up hoodie with adjustable drawstrings.",
    image: hoodie2,
    ratingValue:3.5,
    ratings:75
  },
  {
    name: "Oversized Hoodie",
    price: 60,
    description: "An oversized hoodie perfect for lounging or casual outings.",
    image: hoodie3,
    ratingValue:4.5,
    ratings:35
  },
  {
    name: "Graphic Hoodie",
    price: 55,
    description: "Features bold graphics and a relaxed fit.",
    image: hoodie4,
    ratingValue:1.5,
    ratings:25
  },
  {
    name: "Premium Hoodie",
    price: 75,
    description:
      "High-quality fabric with a luxurious feel and added durability.",
    image: hoodie3,
    ratingValue:5.0,
    ratings:225

  },
  {
    name: "Sporty Hoodie",
    price: 65,
    description: "Designed for active lifestyles with moisture-wicking fabric.",
    image: hoodie2,
    ratingValue:3.5,
    ratings:39
  },
  {
    name: "Vintage Hoodie",
    price: 70,
    description: "A hoodie with a classic vintage design and faded colors.",
    image: hoodie3,
    ratings:567
  },
  {
    name: "Eco-Friendly Hoodie",
    price: 80,
    description: "Made from 100% recycled materials for sustainable fashion.",
    image: hoodie4,
    ratingValue:4.5,
    ratings:137
  },
  {
    name: "Tie-Dye Hoodie",
    price: 50,
    description: "Features a unique tie-dye pattern in vibrant colors.",
    image: hoodie,
    ratingValue:2.5,
    ratings:120
  },
];
</script>

<style lang="scss" scoped></style>
