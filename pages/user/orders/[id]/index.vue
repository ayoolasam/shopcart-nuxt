<template>
  <div class="overflow-y-auto px-4 py-8">
    <NuxtLink to="/user/orders">
      <div class="flex gap-4 items-center">
        <div
          class="h-[40px] w-[40px] text-center flex items-center justify-center rounded-full bg-primary text-white"
        >
          <i class="ri-arrow-left-long-line"></i>
        </div>

        <p class="text-gray-600">
          Order /
          <span class="text-xs text-[primary]">{{ route.params.id }}</span>
        </p>
      </div>
    </NuxtLink>
    <div class="flex gap-4 w-full flex-col xl:flex-row sm:flex-row md:flex-row">
      <div class="flex flex-col xl:w-[800px] gap-4 mt-8">
        <div
          class="px-4 py-4 rounded-xl text-white w-[150px] flex items-center justify-center h-[40px]"
          :class="{
            'bg-orange-500': order.orderStatus === 'Processing',
            'bg-red-400': order.orderStatus === 'Cancelled',
            'bg-green-500': order.orderStatus === 'Delivered',
          }"
        >
          {{ order.orderStatus }}
        </div>
        <div
          v-for="(product, index) in order.products"
          :key="index"
          class="text-xs xl:text-sm flex flex-col mt-4 gap-4 md:gap-0 md:flex-row md:text-sm xl:gap-0 justify-between xl:flex-row px-4 py-4 border-b-[1px] border-[#f6f6f6]"
        >
          <div class="flex md:flex-row flex-col xl:flex-row gap-4">
            <div
              class="md:h-[100px] xl:h-[100px] h-[100px] sm:h-[150px] xl:w-[200px] md:w-[180px] w-full"
            >
              <img
                v-if="product.image"
                :src="product.image"
                class="object-cover h-full w-full rounded-lg object-center"
                alt=""
              />
            </div>
            <div
              class="flex cursor-pointer xl:flex-col md:flex-col w-full justify-between md:justify-normal xl:justify-normal md:28 xl:w-32 flex-row gap-6"
            >
              <div>
                <p>{{ product.name }}</p>
                <div class="text-xs">
                  <span> Qty :{{ product.numOfProducts }}</span>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div
            class="flex xl:flex-col cursor-pointer md:flex-col justify-between items-center xl:items-end"
          >
            <p class="text-md font-bold">{{ formatToNaira(product.total) }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 xl:flex-grow">
        <div class="flex flex-col gap-4">
          <p class="font-bold text-primary">Order Summary</p>
          <div class="flex justify-between">
            <span>SubTotal</span>
            <span>{{ formatToNaira(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Discount</span>
            <span>20%</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping</span>
            <span>500</span>
          </div>
          <div
            class="flex justify-between py-2 border-[#f2f2f2] border-t-[1px]"
          >
            <span>Total</span>
            <span>{{ formatToNaira(order.totalAmount) }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <p class="font-bold text-primary">Shipping Address</p>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between text-xs">
              <span class="font-bold">Name</span>
              <span>{{ order?.shippingAddress?.fullName }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">Phone</span>
              <span>{{ order?.shippingAddress?.phoneNumber }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">Address</span>
              <span>{{ order?.shippingAddress?.address }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">Postal Code</span>
              <span>{{ order?.shippingAddress?.postalCode }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">City</span>
              <span>{{ order?.shippingAddress?.city }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">Country</span>
              <span>{{ order?.shippingAddress?.country }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <p class="font-bold text-primary">Payment Details</p>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between text-xs">
              <span class="font-bold">Payment Method</span>
              <span>{{ order?.paymentMethod }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">Payment Reference</span>
              <span>{{ order?.reference }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="font-bold">Payment Status</span>
              <span :class="{'text-primary font-bold':order?.paymentInfo?.paymentStatus === 'Successfull',
                'text-orange-400 font-bold':order?.paymentInfo?.paymentStatus === 'Pending'
              }">{{ order?.paymentInfo?.paymentStatus }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useToast } from "maz-ui";
definePageMeta({
  layout: "main",
});
const route = useRoute();
const order = ref({});
const loading = ref(true);
const toast = useToast();
const { $apiClient } = useNuxtApp();

function formatToNaira(amount) {
  if (amount == null || isNaN(amount)) {
    return "₦0.00";
  }
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
}

const fetchOrder = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get(`/api/v1/order/${route.params.id}`);
    if (response) {
      order.value = response.data.data.order;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};

onMounted(() => {
  fetchOrder();
});
</script>

<style lang="scss" scoped></style>
