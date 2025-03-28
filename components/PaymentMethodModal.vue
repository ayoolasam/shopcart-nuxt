<template>
  <div class="modal-overlay">
    <div
      class="modal bg-white h-[300px] xl:w-[600px] md:w-[600px] sm:w-[400px] w-[350px] rounded-md px-8 py-6"
    >
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-xl text-primary">Payment Method</h1>
        <div
          @click="closeModal"
          class="w-[50px] h-[50px] rounded-full bg-primary flex hover:scale-120 transition-all duration-500 cursor-pointer justify-center items-center"
        >
          <i class="ri-close-line font-bold text-white"></i>
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-4 text-center">
        <div
          class="w-full border-[#f2f2f2] border-[1px] flex items-center gap-4 h-12 px-4"
        >
          <input
            v-model="payment"
            placeholder="Card"
            value="CARD"
            class="cursor-pointer w-6 h-6"
            type="radio"
          />
          <span class="text-xs">Card</span>
        </div>
        <div
          class="w-full border-[#f2f2f2] border-[1px] h-12 px-4 gap-4 flex items-center"
        >
          <input
            v-model="payment"
            value="COD"
            placeholder="Cash On Delivery(COD)"
            class="cursor-pointer w-6 h-6"
            type="radio"
          />
          <span class="text-xs">Cash On Delivery(COD)</span>
        </div>
      </div>

      <button
        @click="paymentMethod"
        class="mt-4 text-white h-12 flex justify-center items-center rounded-xl w-full bg-primary"
      >
        <span v-if="!loading">Pay</span>
        <MazSpinner size="2em" v-else color="white" />
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeModal", "payment"]);
const closeModal = () => {
  emit("closeModal");
};
const loading = ref(false);
const payment = ref(null);
const Card = ref("Card");
const Cod = ref("COD");

const paymentMethod = () => {
  loading.value = true;
  emit("payment", payment.value);
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
