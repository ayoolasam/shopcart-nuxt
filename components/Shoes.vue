<template>
  <section class="mx-auto container gap-4">
    <h2 class="text-3xl font-bold">Shoes</h2>

    <div
      class="w-full px-2 py-4 rounded-md grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
    <div v-if="loading" v-for="(n,ind) in 8" :key="ind" class="h-[350px] rounded-md w-[300px] flex flex-col gap-4 ">
<div class="h-[60%] w-full skeleton">

</div>
<div class="flex justify-between ">
  <div class="w-[100px] h-[10px] skeleton"></div>
  <div class="w-[100px] h-[10px] skeleton"></div>
</div>
<div class="w-[200px] skeleton h-[10px] rounded-md"></div>
<div class="w-[150px] py-4 skeleton h-[20px] rounded-xl"></div>
    </div>
      <div
      v-else
        v-for="(shoe, index) in shoes"
        :key="index"
        class="h-[350px] cursor-pointer blocks max-w-[300px] flex flex-col gap-[10px]"
      >
        <div class="bg-#f2f2f2">
          <img
            :src="shoe?.images[0]?.url"
            alt="shoe"
            class="h-full w-full rounded-lg"
          />
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-center text-sm font-bold">
            <NuxtLink :to="`/products/${shoe._id}`">
              <span class="hover:underline">{{ shoe.name }}</span>
            </NuxtLink>

            <span>${{ shoe.price }}</span>
          </div>
          <p
            class="text-gray-700 text-[8px] hover:underline hover:font-bold hover:text-primary"
          >
            {{ shoe.description }}
          </p>
          <p class="flex items-center">
            <NuxtRating :rating-value="shoe.rating" />
            <span class="text-[8px]">({{ shoe.numReviews }})</span>
          </p>
          <button
            @click="addToCart(shoe)"
            class="border-[1px] text-xs cursor-pointer border-[#b9b9b9] w-[120px] py-2 text-black rounded-full hover:bg-primary hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "maz-ui";
const { $apiClient } = useNuxtApp();
import { useProductStore } from "../stores/product";
const shoes = ref([]);
const toast = useToast();
const loading = ref(true);
const productStore = useProductStore();

const listShoes = async () => {
  try {
    loading.value = true;
    const response = await $apiClient.get("/api/v1/products");
    if (response) {
      shoes.value = response.data.data.products;
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

onMounted(() => {
  listShoes();
});
</script>

<style lang="scss" scoped></style>
