<template>
  <div class="container">
    <p class="text-gray-600">electronics / HeadPhones</p>

    <div class="w-full xl:h-[600px] flex gap-4 flex-col xl:flex-row  mt-8">
      <div class="flex-1 flex flex-col gap-4  h-full">
        <div class="h-[80%]">
          <img
            :src="shoe"
            alt="product-image"
            class="h-full w-full rounded-lg object-cover object-center"
          />
        </div>
        <div class="gap-4 grid w-full place-items-center md:grid-cols-4 sm:grid-cols-3  grid-cols-2 xl:grid-cols-4 ">
          <div v-for="(n,index) in 4" :key="index" class="w-[130px] h-[100px] bg-[#f8f7f5] rounded-lg">
        </div>
      </div>
     
      </div>
      <div class="flex-1  h-full w-full">
   <div class="px-4 py-12 border-b-[1px] border-[#f6f6f6] flex flex-col gap-2">
    <h1 class="text-3xl font-bold">AirPods - Max</h1>
    <p class="font-normal text-xs text-gray-300">A comfortable pullover hoodie made with soft cotton fleece.</p>
    <p class="flex items-center "><NuxtRating :rating-value="hoodie.ratingValue"/> <span class="text-[8px]">({{ hoodie.ratings }})</span></p> 
   </div>
   <div class="px-4 py-4 border-b-[1px] border-[#f6f6f6] flex flex-col gap-2">
    <h2 class="font-bold text-xl">$567</h2>
   </div>
   <div class="px-4 py-8 flex gap-6 items-center border-b-[1px] border-[#f6f6f6]">
    <div class="xl:w-[200px] xl:h-[70px] w-[120px] h-[50px] rounded-full xl:px-8 px-4 text-lg flex items-center text-primary justify-between  bg-[#f6f6f6]">
      <i class="ri-add-line"></i>
<span>1</span>
<i class="ri-subtract-line"></i>
    </div>
    <div class="text-xs">
<p>Only 12 Items left</p>
<p>Dont Miss Out</p>
    </div>
   
   </div>
   <div class="flex gap-4 p-4 text-xs w-full">
    <div class="xl:px-16 px-8 whitespace-nowrap xl:text-xs text-[10px]  bg-primary hover:bg-white hover:text-primary hover:border-primary hover:border-[1px] text-white h-[50px] rounded-full flex items-center justify-center">
Add To Cart
    </div>
    <div class="xl:px-16 px-8 h-[50px] whitespace-nowrap xl:text-xs text-[10px] text-primary hover:bg-primary hover:text-white border-primary border-[1px] rounded-full flex items-center justify-center bg-[#f6f6f6]">
      Buy Now
    </div>
<div>

</div>
</div>
  
 

        </div>
    </div>
  </div>
</template>

<script setup>
import shoe from "../../assets/images/2.jpg";

definePageMeta({
  layout: "main",
});


const hoodie = {
    name: "Premium Hoodie",
    price: 75,
    description:
      "High-quality fabric with a luxurious feel and added durability.",
    image: shoe,
    ratingValue:5.0,
    ratings:225

  }

</script>

<style lang="scss" scoped></style>
