<template>
  <div class="h-screen p-8">
    <p class="font-bold text-primary">Order History</p>
    <table class="w-full mt-8">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total Amount</th>
          <th>Paid</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <td>{{ order.id }}</td>
          <td>{{ order.Date }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.Total }}</td>
          <td>{{ order.Paid }}</td>
          <td>{{ order.pMethod }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

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
</script>

<style lang="scss" scoped></style>
