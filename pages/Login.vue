<template>
  <div class="xl:h-screen bg-[#f2f2f2] flex py-8 px-8 justify-center">
    <div
      class="bg-white shadow-xl flex flex-col justify-between rounded-md h-[400px] mt-12 w-full sm:w-[500px] md:w-[500px] xl:w-[500px] px-8 py-8"
    >
      <div class="text-center">
        <h2 class="text-primary font-bold text-xl">Login</h2>
      </div>
      <div class="flex flex-col justify-between gap-8">
        <div class="">
          <label class="mb-[5px] text-primary font-bold block">Email</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] h-12 focus:outline-none px-[10px] focus:border-[1px] focus:border-green-300 rounded-md placeholder:text-xs"
            placeholder="email"
            type="email"
          />
        </div>
        <div>
          <label class="mb-[5px] text-primary font-bold block">Password</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] px-[10px] h-12 rounded-md focus:outline-none focus:border-[1px] focus:border-green-300 placeholder:text-xs"
            placeholder="password..."
            type="password"
          />
        </div>
      </div>

      <button class="py-[14px] bg-primary w-full text-white rounded-md">
        Sign in
      </button>
      <div class="text-xs text-center text-primary">
        <NuxtLink to="/Register">
          <span>Dont Have an Account? Sign Up</span>
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
