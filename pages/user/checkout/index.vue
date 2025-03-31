<template>
  <div class="flex xl:flex-row flex-col w-full border-t-[1px] border-[#f2f2f2]">
    <div class="h-full flex-1 flex flex-col gap-4 py-8 px-12">
      <h1 class="font-bold text-primary text-xl">Checkout</h1>
      <p class="font-bold">Shipping Information</p>
      <div class="bg-yellow flex gap-4 w-full">
        <div
          @click="setDelivery('Delivery')"
          class="h-12 border-[#f2f2f2] border-[1px] flex gap-2 cursor-pointer transition duration-500 text-center justify-center items-center text-sm text-gray-500 rounded-md flex-1"
          :class="{
            'bg-primary text-white': deliveryMethod === 'Delivery',
          }"
        >
          <i class="ri-truck-line"></i>
          <span>Delivery</span>
        </div>
        <div
          @click="setDelivery('PickUp')"
          :class="{
            'bg-primary text-white': deliveryMethod === 'PickUp',
          }"
          class="h-12 rounded-md flex-1 border-[#f2f2f2] flex gap-2 text-center cursor-pointer transition duration-500 justify-center items-center text-sm text-gray-500 border-[1px]"
        >
          <i class="ri-box-3-line"></i>
          <span>Pick Up</span>
        </div>
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="block">Full Name</label>
        <input
          v-model="shippingDetails.fullName"
          class="h-12 border-[#f2f2f2] border-[1px] rounded-md w-full px-4 text-xs"
        />
      </div>

      <div class="flex flex-col gap-[10px]">
        <label class="block">Phone Number</label>
        <input
          v-model="shippingDetails.phoneNumber"
          class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 rounded-md text-xs w-full"
          placeholder="Enter Phone Number"
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="block">Address</label>
        <input
          v-model="shippingDetails.address"
          class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 rounded-md text-xs w-full"
          placeholder="Enter Address"
        />
      </div>
      <div class="flex flex-col gap-[10px] relative">
        <label class="block">Country </label>
        <input
          @input="searchCountries"
          v-model="shippingDetails.country"
          class="h-12 border-[#f2f2f2] border-[1px] rounded-md text-xs w-full px-4"
        />
        <div
          v-if="dropDown"
          class="absolute h-[200px] w-full border-[1px] bg-white top-20 rounded-md overflow-auto z-50 border-[#f2f2f2]"
        >
          <p class="p-4" v-if="loading">Loading....</p>
          <p v-if="errorMessage">
            {{ errorMessage }}
          </p>
          <div
            v-for="(country, index) in countries"
            @click="chooseCountry(country.name.common)"
            :key="index"
            class="px-4 w-full hover:bg-[#f2f2f2]"
          >
            {{ country.name.common }}
          </div>
        </div>
      </div>
      <!--  -->
      <div class="grid gap-4 grid-cols-2 xl:grid-cols-3 md:grid-cols-3">
        <div class="flex flex-col gap-[10px]">
          <label class="block">City</label>
          <input
            v-model="shippingDetails.city"
            class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 text-xs rounded-md w-full"
            placeholder="Enter City"
          />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="block">State</label>
          <input
            v-model="shippingDetails.state"
            class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 text-xs rounded-md w-full"
            placeholder="Enter State"
          />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="block">Zip Code</label>
          <input
            v-model="shippingDetails.postalCode"
            class="h-12 border-[#f2f2f2] border-[1px] placeholder:text-xs px-4 text-xs rounded-md w-full"
            placeholder="Enter Zip Code"
          />
        </div>
      </div>
      <!--  -->
    </div>
    <div class="h-full flex-1 flex flex-col gap-4 p-12">
      <h1 class="font-bold text-primary">Review Your Cart</h1>
      <div class="flex flex-col gap-4">
        <div
          v-for="(product, index) in productStore.cart"
          :key="index"
          class="flex text-xs gap-4"
        >
          <div class="h-[100px] w-[150px] rounded-md bg-red-400">
            <img
              v-if="productStore.cart"
              :src="product?.images[0]?.url"
              alt="product-image"
              class="w-full h-full object-center rounded-md object-cover"
            />
          </div>
          <div class="flex flex-col justify-between">
            <div>
              <p>{{ product.name }}</p>
              <p class="text-gray-400">{{ product.numOfProducts }}x</p>
            </div>

            <p>{{ formatToNaira(product.price) }}</p>
          </div>
        </div>
      </div>
      <div class="text-xs flex flex-col gap-2.5">
        <div class="flex justify-between">
          <span class="text-gray-500">subTotal</span>
          <span class="font-bold">{{ formatToNaira(productStore.subTotal) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">shipping</span>
          <span class="font-bold">{{ formatToNaira(productStore.shipping) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Discount</span>
          <span class="font-bold">{{ productStore.discountPercentage }} %</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold">Total</span>
          <span class="font-bold">{{ formatToNaira(productStore.totalAmount) }}</span>
        </div>
      </div>
      <div
        @click="paymentMethod = true"
        class="bg-primary text-white text-md rounded-md flex items-center justify-center w-full h-12"
      >
        <span>Pay now</span>
      </div>
    </div>
  </div>
  <PaymentMethodModal
    v-if="paymentMethod"
    @closeModal="paymentMethod = false"
    @payment="choosePayment"
  />
</template>

<script setup>
import { useProductStore } from "../../stores/product";
import PaymentMethodModal from "~/components/PaymentMethodModal.vue";
import axios from "axios";
import { useToast } from "maz-ui";
import { useRouter } from "vue-router";
definePageMeta({
  layout: "main",
});
const productStore = useProductStore();
const { $apiClient } = useNuxtApp();

const deliveryMethod = ref(null);
const countries = ref([]);
const loading = ref(false);
const router = useRouter();
const toast = useToast();
const dropDown = ref(false);
const paymentMethod = ref("");

const errorMessage = ref("");

const shippingDetails = ref({
  country: "",
  address: "",
  phoneNumber: "",
  fullName: "",

  city: "",
  state: "",
  postalCode: "",
});



function formatToNaira(amount) {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, 
  });
}

const setDelivery = (str) => {
  deliveryMethod.value = str;
};

const listCountries = async () => {
  // if (country.value.length === 0) {
  //   countries.value = [];
  //   dropDown.value = false;
  //   loading.value = false;
  //   return;
  // }
  // let response;
  // try {
  //   response = await axios.get(
  //     `https://restcountries.com/v3.1/name/${country.value}`
  //   );
  //   if (response) {
  //     countries.value = response.data;
  //     if (countries.value.length === 0) {
  //       dropDown.value = false;
  //       errorMessage.value = "No Country found";
  //     } else {
  //       dropDown.value = true;
  //       errorMessage.value = "";
  //     }
  //     loading.value = false;
  //   }
  // } catch (e) {
  //   loading.value = false;
  //   if (e.message.includes("Network")) {
  //     toast.error("Please check your internet connection");
  //   } else {
  //     errorMessage.value = e.response.data.message;
  //   }
  // }
};

const saveShippingDetails = () => {
  productStore.addShippingDetails(shippingDetails.value);
};

const choosePayment = (str) => {
  paymentMethod.value = str;
  Order();
};

const Order = async () => {
  // const order = {
  //   products: productStore.cart.map(
  //     ({ _id, name, numOfProducts, totalPrice, images, price }) => ({
  //       productId: _id,
  //       name,
  //       numOfProducts,
  //       price,
  //       totalPrice,
  //       image: images[0].url,
  //     })
  //   ),
  //   shippingAddress: shippingDetails.value,
  //   totalAmount: productStore.totalAmount,
  //   paymentMethod: paymentMethod.value,
  //   shippingCost: productStore.shipping,
  //   subTotal: productStore.subTotal,
  //   deliveryMethod: deliveryMethod.value,
  // };

  // console.log(order);
  try {
    loading.value = true;
    const response = await $apiClient.post(`/api/v1/order`, {
      products: productStore.cart.map(
        ({ _id, name, numOfProducts, totalPrice, images, price }) => ({
          productId: _id,
          name,
          numOfProducts,
          price,
          total: totalPrice,
          image: images[0].url,
        })
      ),
      shippingAddress: shippingDetails.value,
      totalAmount: productStore.totalAmount,
      paymentMethod: paymentMethod.value,
      shippingCost: productStore.shipping,
      subtotal: productStore.subTotal,
      deliveryMethod: deliveryMethod.value,
    });
    if (response) {
      loading.value = false;
      paymentMethod.value = false;
      productStore.clearCart();
      if (response.data.data.payment) {
        window.location.href =
          response.data.data.payment.data.authorization_url;
      } else {
        toast.success("Order Received successfully");
        router.push("/user/orders");
      }
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};

const searchCountries = () => {
  loading.value = true;
  errorMessage.value = "";
  setTimeout(() => {
    listCountries();
  }, 500);
};

// const listCountries = async () => {
//   if (!country.value || country.value.trim() === "") {
//     loading.value = false; // Stop loading if input is empty
//     return;
//   }

//   try {
//     loading.value = true;
//     errorMessage.value = ""; // Clear previous errors

//     const response = await axios.get(
//       `https://restcountries.com/v3.1/name/${country.value}`
//     );

//     if (response && response.data.length > 0) {
//       countries.value = response.data;
//     } else {
//       countries.value = [];
//       errorMessage.value = "Country Not Found";
//     }
//   } catch (e) {
//     countries.value = [];
//     if (e.message.includes("Network")) {
//       toast.error("Please check your internet connection");
//     } else {
//       toast.error(e.message);
//     }
//   } finally {
//     loading.value = false; // Always stop loading after the request
//   }
// };

// const listCountries = async () => {
//   try {
//     loading.value = true;
//     dropDown.value = true;

//     const response = await axios.get(
//       `https://restcountries.com/v3.1/name/${country.value}`
//     );
//     if (response) {
//       countries.value = response.data;
//       loading.value = false;
//     }
//   } catch (e) {
//     if (e.message.includes("Network")) {
//       toast.error("Please check your internet connection");
//     } else toast.error(e.message);
//   }
// };

// const showDropDown = () => {
//   if (country.value.length > 0) {
//     setTimeout(() => {
//       listCountries();
//     }, 500);
//   }
// };

// const showDropDown = () => {
//   if (country.value.length > 0) {
//     setTimeout(() => {
//       dropDown.value = true;
//       listCountries();
//     }, 500);
//   } else {
//     dropDown.value = false;
//     countries.value = [];
//     errorMessage.value = "";
//     loading.value = false;
//   }
// };

const chooseCountry = (str) => {
  // country.value = str;
  // dropDown.value = false;
};
</script>

<style scoped>
input {
  outline: none;
}
</style>
