<template>
  <div class="text-xs text-gray-600 py-8 px-8">
    <div class="flex gap-4 flex-col xl:flex-row md:flex-row sm:flex-row">
      <div class="flex flex-col gap-4 my-8">
        <div class="flex gap-4">
          <div>
            <div
              v-if="userStore.userData.avatar"
              class="h-[80px] w-[80px] rounded-full"
            >
              <img
                :src="userStore?.userData?.avatar"
                alt="profile-Image"
                class="h-full w-full object-cover rounded-full object-center"
              />
            </div>
            <div
              v-else
              class="border-[1px] border-[#f2f2f2] flex items-center justify-center rounded-full h-[80px] w-[80px]"
            >
              {{ userStore.userData.FirstName[0]
              }}{{ userStore.userData.LastName[0] }}
            </div>
          </div>

          <div class="flex flex-col justify-between text-xs text-gray-600">
            <div
              class="flex flex-col xl:flex-row md:flex-row sm:flex-row xl:gap-2"
            >
              <span class="font-bold text-xl text-primary"
                >{{ userStore.userData.FirstName }}
                {{ userStore.userData.LastName }}</span
              >
              <span
                class="text-green-500"
                :class="{
                  'text-green-400': userStore.userData.active === 'Active',
                  'text-red-500': userStore.userData.active === 'InActive',
                }"
                >{{ userStore.userData.active ? "Active" : "InActive" }}</span
              >
            </div>
            <div>
              <span>Role: {{ userStore.role }}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="flex gap-2 ml-6 items-center">
            <i class="ri-calendar-line"></i>Joined
            {{ formatDate(userStore.userData.createdAt) }}
          </p>
        </div>
        <div class="flex gap-4 flex-col xl:flex-row md:flex-row sm:flex-row">
          <span
            class="border-[1px] items-center xl:w-[300px] rounded-md flex gap-4 border-[#f2f2f2] px-8 py-[5px]"
          >
            <i class="ri-calendar-line"></i>{{ userStore.userData.email }}</span
          >
         
        </div>
      </div>
      <div class="flex flex-col gap-8 items-center">
        <NuxtLink to="/user/profile/updateUserDetails">
          <span
            class="text-md"
            :class="{
              'text-white bg-primary whitespace-nowrap transition-all duration-700 px-4 rounded-md py-[6px] font-bold':
                currentTab === 'updateUser',
            }"
            >Update User Details</span
          >
        </NuxtLink>
        <NuxtLink to="/user/profile/changePassword">
          <span
            :class="{
              ' text-white whitespace-nowrap bg-primary transition-all duration-700 px-4 rounded-md py-[6px] font-bold':
                currentTab === 'changePassword',
            }"
            >Change Password</span
          >
        </NuxtLink>
        <NuxtLink to="/user/profile/uploadAvatar">
          <span
            :class="{
              'text-white bg-primary whitespace-nowrap transition-all duration-700 px-4 rounded-md py-[6px] font-bold':
                currentTab === 'uploadAvatar',
            }"
            >upload UserAvatar</span
          >
        </NuxtLink>
        <NuxtLink to="/user/profile/">
          <span></span>
        </NuxtLink>
      </div>
      <NuxtPage> </NuxtPage>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "#imports";
import { useRoute,useRouter } from "vue-router";
definePageMeta({
  layout: "main",
});
const currentTab = ref("updateUser");

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

watchEffect(() => {
  if (route.path === "/user/profile/updateUserDetails") {
    currentTab.value = "updateUser";
  } else if (route.path === "/user/profile/changePassword") {
    currentTab.value = "changePassword";
  } else {
    currentTab.value = "uploadAvatar";
  }
});

onMounted(() => {
 
  router.replace('/user/profile/updateUserDetails')
});
</script>

<style lang="scss" scoped></style>
