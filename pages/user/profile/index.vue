<template>
  <div class="h-screen text-xs text-gray-600 py-8 px-4">
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <div class="h-[80px] w-[80px] bg-primary rounded-full">
          <!-- <img src="" alt="profile-Image" class="h-full w-full" /> -->
        </div>
        <div class="flex flex-col justify-between text-xs text-gray-600">
          <div class="flex gap-2">
            <span class="font-bold text-xl text-primary">Pablo Cassanova</span>
            <span class="text-green-500" :class="{'text-green-400':status === true}">Active</span>
          </div>
          <div>
            <span>Role: user</span>
          </div>
        </div>
      </div>
      <div>
        <p class="flex gap-2 ml-6 items-center"> <i class="ri-calendar-line"></i>Joined March 24,2022</p>
      </div>
      <div class="flex gap-4">
        <span class="border-[1px] items-center rounded-md flex gap-4 border-[#f2f2f2] px-8 py-[5px]"
          > <i class="ri-calendar-line"></i>Obayomisamuel@gmail.com</span
        >
        <span class="border-[1px] items-center rounded-md flex gap-4 border-[#f2f2f2] px-8 py-[5px]"> <i class="ri-phone-line"></i>09078329726</span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});
</script>

<style lang="scss" scoped></style>
