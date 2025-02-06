<template>
  <section class="mx-auto container gap-4">
    <h2 class="text-3xl font-bold">Shoes</h2>

    <div
      class="w-full p-4 rounded-md grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="(shoe, index) in shoes"
        :key="index"
        class="h-[350px] blocks max-w-[300px] flex flex-col gap-[10px]"
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
              <span>{{ shoe.name }}</span>
            </NuxtLink>

            <span>${{ shoe.price }}</span>
          </div>
          <p class="text-gray-700 text-[8px]">{{ shoe.description }}</p>
          <p class="flex items-center">
            <NuxtRating :rating-value="shoe.rating" />
            <span class="text-[8px]">({{ shoe.numReviews }})</span>
          </p>
          <button
            class="border-[1px] text-xs border-[#b9b9b9] w-[120px] py-2 text-black rounded-full hover:bg-primary hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import shoe from "../assets/images/heros.jpg";
import shoe2 from "../assets/images/2.jpg";
import shoe3 from "../assets/images/3.jpg";
import { useToast } from "maz-ui";
const { $apiClient } = useNuxtApp();
const shoes = ref([]);
const toast = useToast();
const loading = ref(false);

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

onMounted(() => {
  listShoes();
});
// const shoes = [
//   {
//     name: "Nike Air Max 270",
//     price: 150,
//     description: "Lightweight sneakers with excellent cushioning.",
//     image: shoe,
//     ratingValue: 2.5,
//     ratings: 34,
//   },
//   {
//     name: "Adidas Ultraboost",
//     price: 180,
//     description: "Comfortable running shoes with superior energy return.",
//     image: shoe2,
//     ratingValue: 5.0,
//     ratings: 78,
//   },
//   {
//     name: "Puma RS-X",
//     price: 120,
//     description: "Bold, retro-style sneakers for everyday wear.",
//     image: shoe3,
//     ratingValue: 2.5,
//     ratings: 100,
//   },
//   {
//     name: "Reebok Nano X1",
//     price: 130,
//     description: "Versatile training shoes built for performance.",
//     image: shoe3,
//     ratingValue: 3.5,
//     ratings: 90,
//   },
//   {
//     name: "New Balance 574",
//     price: 100,
//     description: "Classic sneakers with a timeless design.",
//     image: shoe2,
//     ratingValue: 4.5,
//     ratings: 335,
//   },
//   {
//     name: "Asics Gel-Kayano",
//     price: 140,
//     description: "Stability-focused running shoes for long-distance runs.",
//     image: shoe,
//     ratingValue: 3.5,
//     ratings: 145,
//   },
//   {
//     name: "Converse Chuck Taylor",
//     price: 70,
//     description: "Iconic canvas sneakers for casual wear.",
//     image: shoe2,
//     ratingValue: 5.0,
//     ratings: 189,
//   },
//   {
//     name: "Vans Old Skool",
//     price: 60,
//     description: "Skate-inspired sneakers with a durable design.",
//     image: shoe2,
//     ratingValue: 4.5,
//     ratings: 178,
//   },
//   {
//     name: "Hoka One One Clifton 8",
//     price: 160,
//     description: "Plush running shoes with a smooth, lightweight ride.",
//     image: shoe3,
//     ratingValue: 3.5,
//     ratings: 56,
//   },
// ];
</script>

<style lang="scss" scoped></style>
