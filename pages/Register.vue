<template>
  <div class="xl:h-screen bg-[#f2f2f2] flex py-8 px-8 justify-center">
    <div
      class="bg-white shadow-xl flex flex-col justify-between rounded-md h-[580px] gap-6 w-full sm:w-[500px] md:w-[500px] xl:w-[500px] px-8 py-4"
    >
      <div class="text-center">
        <h2 class="text-primary font-bold text-xl">Sign Up</h2>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <div class="">
          <label class="mb-[5px] text-primary font-bold block"
            >First Name</label
          >
          <input
            class="w-full text-xs bg-[#f2f2f2] h-12 focus:outline-none px-[10px] focus:border-[1px] focus:border-green-300 rounded-md placeholder:text-xs"
            placeholder="First Name"
          />
        </div>
        <div class="">
          <label class="mb-[5px] text-primary font-bold block">Last Name</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] h-12 focus:outline-none px-[10px] focus:border-[1px] focus:border-green-300 rounded-md placeholder:text-xs"
            placeholder="Last Name"
          />
        </div>
        <div class="">
          <label class="mb-[5px] text-primary font-bold block">Email</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] h-12 focus:outline-none px-[10px] focus:border-[1px] focus:border-green-300 rounded-md placeholder:text-xs"
            placeholder="email"
          />
        </div>
        <div>
          <label class="mb-[5px] text-primary font-bold block">Password</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] px-[10px] h-12 rounded-md focus:outline-none focus:border-[1px] focus:border-green-300 placeholder:text-xs"
            placeholder="password..."
          />
        </div>
      </div>

      <div class="text-center">
        <button
          class="py-[14px] mb-[5px] bg-primary w-full text-white rounded-md"
        >
          Sign Up
        </button>
        <NuxtLink to="/Login">
          <span class="text-xs text-primary"> Have an Account? Log In</span>
        </NuxtLink>
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
