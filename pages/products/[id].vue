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
      v-if="product"
      class="w-full xl:h-[600px] flex gap-4 flex-col xl:flex-row mt-8"
    >
      <div class="flex-1 flex flex-col gap-4 h-full">
        <div class="h-[80%]">
          <img
            v-if="product?.images"
            :src="image"
            alt="product-image"
            class="h-full w-full rounded-lg object-cover object-center"
          />
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
              class="w-full h-full"
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
          <h2 class="font-bold text-xl">${{ product.price }}</h2>
        </div>
        <div
          class="px-4 py-8 flex gap-6 items-center border-b-[1px] border-[#f6f6f6]"
        >
          <div
            class="xl:w-[200px] xl:h-[70px] w-[120px] h-[50px] rounded-full xl:px-8 px-4 text-lg flex items-center text-primary justify-between bg-[#f6f6f6]"
          >
            <i class="ri-add-line"></i>
            <span>1</span>
            <i class="ri-subtract-line"></i>
          </div>
          <div class="text-xs">
            <p>Only 12 Items left</p>
            <p>Dont Miss Out</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 text-xs w-full">
          <div
            @click="addToCart(product)"
            class="xl:px-16 px-8 whitespace-nowrap xl:text-xs text-[10px] bg-primary hover:bg-white hover:text-primary hover:border-primary hover:border-[1px] text-white h-[50px] rounded-full flex items-center justify-center"
          >
            Add To Cart
          </div>
          <div
            class="xl:px-16 px-8 h-[50px] whitespace-nowrap xl:text-xs text-[10px] text-primary hover:bg-primary hover:text-white border-primary border-[1px] rounded-full flex items-center justify-center bg-[#f6f6f6]"
          >
            Buy Now
          </div>
        </div>
        <div class="w-full mt-4">
          <p
            @click="showModal = true"
            class="text-primary text-md w-[300px] h-12 rounded-md text-center cursor-pointer hover:bg-primary hover:text-white py-4 bg-[#f2f2f2]"
          >
            Review Product
          </p>
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
const loading = ref(false);
const image = ref();
const toast = useToast();
const productStore = useProductStore();
const { $apiClient } = useNuxtApp();

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
const hoodie = {
  name: "Premium Hoodie",
  price: 75,
  description:
    "High-quality fabric with a luxurious feel and added durability.",
  image: shoe,
  ratingValue: 5.0,
  ratings: 225,
};
</script>

<style lang="scss" scoped></style>
