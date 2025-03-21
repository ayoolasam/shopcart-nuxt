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
            v-model="firstName"
          />
        </div>
        <div class="">
          <label class="mb-[5px] text-primary font-bold block">Last Name</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] h-12 focus:outline-none px-[10px] focus:border-[1px] focus:border-green-300 rounded-md placeholder:text-xs"
            placeholder="Last Name"
            v-model="LastName"
          />
        </div>
        <div class="">
          <label class="mb-[5px] text-primary font-bold block">Email</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] h-12 focus:outline-none px-[10px] focus:border-[1px] focus:border-green-300 rounded-md placeholder:text-xs"
            placeholder="email"
            v-model="email"
          />
        </div>
        <div>
          <label class="mb-[5px] text-primary font-bold block">Password</label>
          <input
            class="w-full text-xs bg-[#f2f2f2] px-[10px] h-12 rounded-md focus:outline-none focus:border-[1px] focus:border-green-300 placeholder:text-xs"
            placeholder="password..."
            v-model="password"
          />
        </div>
      </div>

      <div class="text-center">
        <button
         @click="Register"
        :disabled="!email || !password || !firstName || !LastName"
          class="py-[14px] mb-[5px] bg-primary w-full text-white flex items-center justify-center rounded-md"
        >
        <span v-if="!loading">Sign Up</span>
        <MazSpinner v-else size="2em" color="white"/>
          
        </button>
        <NuxtLink to="/Login">
          <span class="text-xs text-primary"> Have an Account? Log In</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
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
const firstName = ref("")
const LastName = ref("")

const Register = async () => {
  try { 
    loading.value = true;
    const response = await $apiClient.post("/api/v1/Register", {
      password: password.value,
      email: email.value,
      FirstName: firstName.value,
      LastName: LastName.value,

    });
    if (response) {
      loading.value = false;
      toast.success("Registration successful");

     
      router.push("/Login");
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.response.data.message);
    }
  }
};

</script>

<style lang="scss" scoped></style>
