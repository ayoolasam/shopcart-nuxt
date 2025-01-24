<template>
  <div class="h-screen bg-[#f2f2f2]">
    <div class="container h-full w-full">
      <div class="h-[500px] overflow-y-auto overflow-x-auto bg-white rounded-2xl container w-[70%]">
        <h1 class="text-2xl font-bold py-4 border-b-[1px] border-[#f6f6f6]">
          Cart
        </h1>

        <div v-for="(n,index) in 2" :key="index" class="w-full flex justify-between px-4  py-4 border-b-[1px] border-[#f6f6f6]">
          <div class="flex gap-4">
            <div class="h-[120px]  w-[200px] ">
            <img
              :src="shoe"
              class="object-cover h-full w-full rounded-lg object-center"
              alt=""
            />
          </div>
          <div class="flex flex-col gap-6">
            <div>
              <p>Ralp Lauren</p>
              <div class="text-xs text-gray-300"><span>$12</span> | <span class="text-green-400">In Stock</span></div>
            </div>
            <div class="">
<div class="h-[40px] flex justify-between items-center rounded-lg px-4 bg-[#f6f6f6]">
  <i class="ri-add-line"></i>
<span class="text-xs">1</span>
<i class="ri-subtract-line"></i>
</div>
            </div>
           
          </div>
          </div>
          <!--  -->
          <div class="flex flex-col justify-between items-end ">
            <p class="text-xl font-bold">$12</p>
      
              <div class="px-12 bg-[#f6f6f6]  text-primary hover:bg-primary hover:text-white h-[50px] rounded-md flex items-center gap-4">
                <i class="ri-delete-bin-7-fill"></i> <span>Delete</span>
    </div>
  
        
          </div>
         
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import shoe from "../../assets/images/3.jpg";
definePageMeta({
  layout: "main",
});
</script>

<style lang="scss" scoped></style>
