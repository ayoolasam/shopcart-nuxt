<template>
  <div class="modal-overlay">
    <div class="modal bg-white h-[350px] w-[400px] rounded-md px-4 py-6">
      <h1 class="font-bold text-xl text-primary">Review</h1>
      <div class="mt-4 flex flex-col gap-4">
        <label class="text-sm">Review</label>
        <input
          placeholder="Type in Your Review "
          v-mdel="review"
          class="h-12 px-4 outline-none border-[1px] rounded-md text-xs placeholder:text-xs border-[#f2f2f2] w-full"
        />
      </div>
      <div class="mt-4 flex flex-col gap-4">
        <label class="text-sm">Rating</label>
        <NuxtRating
          :read-only="false"
          v-on:rating-selected="logRating"
          :rating-value="0"
          :rating-size="50"
        ></NuxtRating>
        <!-- <div class="flex items-center">
      <p>Rating :</p>
      <NuxtRating
        class="px-3"
        border-color="#db8403"
        active-color="#ffa41c"
        inactive-color="#fff"
        :rating-step="0.1"
        :rounded-corners="true"
        :border-width="5"
        :rating-size="10"
        :rating-value="3.7"
        @rating-selected="logRating"
        @rating-hovered="event => (rating = event)" />
      <p>{{ rating }}</p>
    </div> -->
      </div>
      <button class="mt-4 text-white h-12 rounded-xl w-full bg-primary">
        Send Review
      </button>
    </div>
  </div>
</template>

<script setup>
const rating = ref(0);

const review = ref("");
const logRating = (ratingValue) => {

  rating.value = ratingValue;
  console.log(rating.value);
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
