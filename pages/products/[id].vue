<template>
  <div class="py-8 px-4">
    <NuxtLink to="/">
      <div class="flex gap-4 items-center">
        <div
          class="h-[40px] w-[40px] text-center flex items-center justify-center rounded-full bg-primary text-white"
        >
          <i class="ri-arrow-left-long-line"></i>
        </div>

        <p class="text-gray-600">Back To Home</p>
      </div>
    </NuxtLink>

    <div
      v-if="loading"
      class="w-full xl:h-[600px] flex gap-4 flex-col xl:flex-row mt-8"
    >
      <div class="flex-1 flex flex-col gap-4 rounded-md">
        <div class="skeleton w-full xl:h-[80%] h-[400px]"></div>
        <div
          class="grid grid-cols-2 xl:grid-cols-4 w-full place-items-center justify-between gap-4"
        >
          <div
            v-for="(n, ind) in 4"
            :key="ind"
            class="rounded-lg w-[130px] h-[100px] skeleton"
          ></div>
        </div>
      </div>
      <div class="flex-1 py-8 px-4 rounded-md flex flex-col gap-12">
        <div class="flex-col gap-4 flex">
          <div class="w-[60%] h-[50px] rounded-md skeleton"></div>
          <div class="w-[70%] h-[20px] rounded-md skeleton"></div>
          <div class="w-[40%] h-[50px] rounded-md skeleton"></div>
        </div>
        <div class="flex-col gap-4 flex">
          <div class="w-[60%] h-[50px] rounded-md skeleton"></div>
        </div>
        <div class="flex-col gap-4 flex">
          <div class="w-full h-[50px] rounded-md skeleton"></div>
          <div class="w-[70%] h-[20px] rounded-md skeleton"></div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="w-full  flex gap-4 flex-col xl:flex-row mt-8"
    >
      <div class="flex-1 flex flex-col gap-4 h-full">
        <div class="h-[80%] relative">
          <img
            v-if="product?.images"
            :src="image"
            alt="product-image"
            class="h-full w-full transition-all duration-500 rounded-lg object-cover object-center"
          />
          <i
            class="ri-arrow-left-s-line absolute top-[50%] left-4 font-bold text-3xl text-primary"
          ></i>
          <i
            class="ri-arrow-right-s-line font-bold text-3xl absolute top-[50%] right-4 text-primary"
          ></i>
        </div>
        <div
          class="gap-4 grid w-full place-items-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-4"
        >
          <div
            v-for="(image, index) in product.images"
            :key="index"
            class="w-[130px] h-[100px] bg-[#f8f7f5] rounded-lg"
          >
            <img
              @click="setImage(image.url)"
              :src="image.url"
              alt=""
              class="w-full h-full cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div class="flex-1 h-full w-full">
        <div
          class="px-4 py-12 border-b-[1px] border-[#f6f6f6] flex flex-col gap-2"
        >
          <h1 class="text-3xl font-bold">{{ product?.name }}</h1>
          <p class="font-normal text-xs text-gray-300">
            {{ product?.description }}
          </p>
          <p class="flex items-center">
            <ClientOnly>
              <NuxtRating :rating-value="product.rating" />
            </ClientOnly>

            <span class="text-[8px]">({{ product.numReviews }})</span>
          </p>
        </div>
        <div
          class="px-4 py-4 border-b-[1px] border-[#f6f6f6] flex flex-col gap-2"
        >
          <h2 class="font-bold text-xl">{{ formatToNaira(product.price) }}</h2>
        </div>
        <div
          class="px-4 py-8 flex gap-6 items-center border-b-[1px] border-[#f6f6f6]"
        >
          <div
            class="xl:w-[200px] cursor-pointer xl:h-[70px] w-[120px] h-[40px] rounded-full text-lg flex items-center text-primary justify-between bg-[#f6f6f6]"
          >
            <div
              class="hover:bg-[#f1f1f1f1] transition-all duration-500 w-full h-full flex rounded-full justify-center items-center"
            >
              <i
                @click="productStore.addToExistingProduct(product)"
                class="ri-add-line"
              ></i>
            </div>

            <span class="text-xs">{{ product.quantity }}</span>
            <div
              class="w-full h-full hover:bg-[#f1f1f1f1] transition-all duration-500 flex justify-center text-center rounded-full items-center"
            >
              <i
                @click="productStore.subTractFromExistingProduct(product)"
                class="ri-subtract-line"
              ></i>
            </div>
          </div>
          <div class="text-xs flex xl:justify-start justify-center">
            <div>
              <p>Only {{ product.quantity }} Items left</p>
              <p>Dont Miss Out</p>
            </div>
          </div>
        </div>
        <div
          class="flex gap-4 p-4 text-xs xl:justify-start justify-center w-full"
        >
          <div
            @click="addToCart(product)"
            class="xl:px-16 hover:cursor-pointer px-8 whitespace-nowrap xl:text-xs text-[10px] bg-primary hover:bg-white hover:text-primary hover:border-primary hover:border-[1px] text-white h-[50px] rounded-full flex items-center justify-center"
          >
            Add To Cart
          </div>
          <NuxtLink to="/">
            <div
              class="xl:px-16 px-8 h-[50px] whitespace-nowrap xl:text-xs text-[10px] text-primary hover:bg-primary hover:text-white border-primary border-[1px] rounded-full flex items-center justify-center bg-[#f6f6f6]"
            >
              Buy Now
            </div>
          </NuxtLink>
        </div>
        <div class="w-full mt-4 flex xl:justify-start justify-center">
          <p
            @click="showModal = true"
            class="text-primary text-md w-[300px] h-12 flex items-center justify-center xl:text-md text-xs rounded-md text-center cursor-pointer hover:bg-primary hover:text-white py-4 bg-[#f2f2f2]"
          >
            Review Product
          </p>
        </div>
        <p v-if="product.numReviews > 0" class="mt-8 text-primary">Reviews</p>
        <div
          v-if="product.reviews"
          class="mt-4 flex  -space-x-4 justify-center xl:justify-start"
        >
          <div v-for="(user, index) in product.reviews" :key="index">
            <img
              v-if="user.user.avatar"
              class="rounded-full w-12 h-12 border-2 border-white"
              :src="user.user.avatar"
              alt="user-image"
            />
            <div
              v-else
              class="rounded-full bg-primary text-white text-center flex items-center justify-center w-12 h-12 border-[1px] border-[#f5f5f5]"
            >
              <span class=" text-xs font-bold"
                >  {{
      (user?.user.FirstName ? user.user.FirstName[0] : '') +
      (user?.user.LastName ? user.user.LastName[0] : '')
    }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <Review v-if="showModal" @closeModal="showModal = false" />
  </div>
</template>

<script setup>
import shoe from "../../assets/images/2.jpg";
import { useRoute } from "vue-router";
import { useToast } from "maz-ui";
import { useProductStore } from "../../stores/product";
import Review from "~/components/Review.vue";

definePageMeta({
  layout: "main",
});

const route = useRoute();
const showModal = ref(false);

const product = ref({});
const loading = ref(true);
const image = ref();
const toast = useToast();
const productStore = useProductStore();
const { $apiClient } = useNuxtApp();

function formatToNaira(amount) {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const fetchProduct = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get(
      `/api/v1/products/${route.params.id}`
    );
    if (response) {
      product.value = response.data.data.product;
      image.value = response.data.data.product.images[0].url;
      loading.value = false;
    }
  } catch (e) {
    if (e.message.includes("Network")) {
      toast.error("Please check your internet connection");
    } else {
      toast.error(e.message);
    }
  }
};

const addToCart = (product) => {
  const addProduct = productStore.addToCart(product);

  if (!addProduct) {
    toast.error("Product already added to Cart");
  } else {
    toast.success(`${product.name} added to Cart`);
  }
};

const setImage = (img) => {
  image.value = img;
};

onMounted(() => {
  fetchProduct();
});
</script>

<style lang="scss" scoped></style>
