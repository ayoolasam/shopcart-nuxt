<template>
  <div class="h-screen p-8">
    <p class="font-bold text-primary">Order History</p>
    <div class="overflow-x-auto w-full">
      <table class="w-full mt-8">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Paid</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in orders"
            :key="index"
            class="hover:bg-green-300"
          >
            <td>{{ order.id }}</td>
            <td>{{ order.Date }}</td>
            <td
              :class="{
                'text-orange-400 font-bold': order.status === 'processing',
                'text-green-400 font-bold': order.status === 'delivered',
                'text-red-500 font-bold': order.status === 'cancelled',
              }"
            >
              {{ order.status }}
            </td>
            <td>{{ order.Total }}</td>
            <td
              :class="{
                'text-green-500': order.Paid === 'Paid',
                'text-red-500': order.Paid === 'Not Paid',
                'text-orange-500': order.Paid === 'Pending',
              }"
            >
              {{ order.Paid }}
            </td>
            <td>{{ order.pMethod }}</td>
            <td class="relative">
              <i
                @click.stop="toggleActions(index)"
                class="ri-more-2-line text-md font-bold"
              ></i>
              <div
                v-if="actions && ind === index"
                class="h-[70px] actions-menu top-8 shadow-xl flex flex-col z-50 right-4 absolute bg-white w-[150px] rounded-md"
              >
                <NuxtLink to="/user/orders/1234" class="flex-1 w-full">
                  <p
                    class="flex h-full w-full gap-4 items-center rounded-tr-xl rounded-tl-xl hover:bg-[#f2f2f2] flex-1 px-4"
                  >
                    <i class="ri-eye-line"></i> <span>Details</span>
                  </p>
                </NuxtLink>

                <p
                  class="flex gap-4 rounded-br-xl rounded-bl-xl hover:bg-[#f2f2f2] items-center flex-1 px-4"
                >
                  <i class="ri-megaphone-line"></i> <span>Complaint</span>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});
const actions = ref(false);
const ind = ref(null);
const orders = [
  {
    id: "12345678",
    Date: "23-43-56",
    status: "processing",
    Total: 23456,
    Paid: "Paid",
    pMethod: "COD",
  },
  {
    id: "12345678",
    Date: "23-43-56",
    status: "delivered",
    Total: 23456,
    Paid: "Not Paid",
    pMethod: "COD",
  },
  {
    id: "12345678",
    Date: "23-43-56",
    status: "cancelled",
    Total: 23456,
    Paid: "Pending",
    pMethod: "COD",
  },
  {
    id: "12345678",
    Date: "23-43-56",
    status: "processing",
    Total: 23456,
    Paid: "Paid",
    pMethod: "COD",
  },
  {
    id: "12345678",
    Date: "23-43-56",
    status: "processing",
    Total: 23456,
    Paid: "Paid",
    pMethod: "COD",
  },
];

const toggleActions = (id) => {
  actions.value = !actions.value;
  ind.value = id;
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest("actions-menu") && actions.value) {
      actions.value = false;
    }
  });
});
</script>

<style lang="scss" scoped></style>
