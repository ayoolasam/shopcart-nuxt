<template>
  <div class="w-full flex flex-col gap-4 xl:h-[500px] h-full">
    <div class="flex flex-col gap-2">
      <label>First Name</label>
      <input
        v-model="firstName"
        class="h-12 w-full focus:outline-none px-4 border-[1px] border-[#f2f2f2]"
        placeholder="Name"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label>Last Name</label>
      <input
        v-model="lastName"
        class="h-12 w-full focus:outline-none px-4 border-[1px] border-[#f2f2f2]"
        placeholder="Name"
      />
    </div>

    <button
      @click="update"
      class="w-full h-12 bg-primary text-white flex items-center rounded-xl justify-center"
    >
      <span v-if="!loading">Update</span>
      <MazSpinner v-else size="2em" color="white" />
    </button>
  </div>
</template>

<script setup>
import { useToast } from "maz-ui";

import { useUserStore } from "#imports";

const emit = defineEmits("updated");

const { $apiClient } = useNuxtApp();
const userStore = useUserStore();
const toast = useToast();
const loading = ref(false);

const firstName = ref("");
const lastName = ref("");

const update = async () => {
  const payload = {};

  if (firstName.value.trim()) payload.FirstName = firstName.value;
  if (lastName.value.trim()) payload.LastName = lastName.value;

  try {
    loading.value = true;
    const response = await $apiClient.put("/api/v1/user/update", payload);
    if (response) {
      loading.value = false;
      userStore.fetchUserDetails();
      toast.success("User Details Updated Successfully");
      emit("updated");
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
