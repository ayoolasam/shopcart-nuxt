<template>
  <div class="modal-overlay">
    <div class="modal bg-white h-[250px] w-[600px] rounded-md px-8 py-6">
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-xl text-primary">{{Heading}}</h1>
        <div
          @click="closeModal"
          class="w-[50px] h-[50px] rounded-full bg-primary flex hover:scale-120 transition-all duration-500 cursor-pointer justify-center items-center"
        >
          <i class="ri-close-line font-bold text-white"></i>
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-4 text-center">
      <p class="font-bold text-xl text-red-500">{{sub}}</p>
      
      </div>
      <div class="mt-4 flex flex-col gap-4 text-center">
   <p class="text-xs text-red-500">{{miniSub}}</p>
      </div>
      <button
        @click="reviewProduct"
      
        class="mt-4 text-white h-12 rounded-xl w-full bg-primary"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useToast } from "maz-ui";
const rating = ref(0);
const emit = defineEmits(["closeModal"]);
const props = defineProps(["Heading","sub","miniSub"]);
const { $apiClient } = useNuxtApp();
const loading = ref(false);
const review = ref("");
const route = useRoute();
const toast = useToast();
const logRating = (ratingValue) => {
  rating.value = ratingValue;
};

const closeModal = () => {
  emit("closeModal");
};

const reviewProduct = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.post(
      `/api/v1/products/review/${route.params.id}`,
      {
        comment: review.value,
        rating: rating.value,
      }
    );
    if (response) {
      toast.success("Review Sent Successfully");
      closeModal();
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
}
</style>
