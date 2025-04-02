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
            v-model="email"
          />
        </div>
        <div>
          <label class="mb-[5px] text-primary font-bold block">Password</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] px-[10px] h-12 rounded-md focus:outline-none focus:border-[1px] focus:border-green-300 placeholder:text-xs"
            placeholder="password..."
            type="password"
            v-model="password"
          />
        </div>
      </div>

      <button
        @click="login"
        :disabled="!email || !password"
        class="h-12 bg-primary w-full flex items-center justify-center text-white rounded-md"
      >
        <span v-if="!loading">Sign In</span>
        <MazSpinner v-else size="2em" color="white" />
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
import axios from "axios";
import { useToast } from "maz-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "#imports";

definePageMeta({
  layout: "main",
});

const { $apiClient } = useNuxtApp();
const userStore = useUserStore();
const toast = useToast();
const loading = ref(false);
const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.post("/api/v1/login", {
      password: password.value,
      email: email.value,
    });
    if (response) {
      loading.value = false;
      userStore.updateUserData(response.data.data.userDetails);
      userStore.updateToken(response.data.data.token);

      userStore.updateEmail(response.data.data.userDetails.email);
      userStore.updateRole(response.data.data.userDetails.role);
      toast.success("Login successful");

      router.push("/");
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
      loading.value = false;
    } else {
      loading.value = false;
      toast.error(e.response.data.message);
    }
  }
};
</script>

<style lang="scss" scoped></style>
