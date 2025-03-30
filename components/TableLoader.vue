<template>
  <div>
    <div class="overflow-x-auto w-full">
      <table class="w-[600px] xl:w-full mt-8">
        <thead>
          <tr>
            <th class="">
              <p class="h-4 w-full skeleton"></p>
            </th>

            <th class=""> <p class="h-4 w-full skeleton"></p></th>
            <th >
              <p class="h-4 w-full skeleton"></p>
            </th>
            <th  >
              <p class="h-4 w-full skeleton"></p>
            </th>
            <th >
              <p class="h-4 w-full skeleton"></p>
            </th>
            <th >
              <p class="h-4 w-full skeleton"></p>
            </th>
            <th >
              <p class="h-4 w-full skeleton"></p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(n, index) in 5"
            :key="index"
           
          >
            <td>
              <p class="h-4 w-full skeleton"></p>
            </td>

            <td
            
            >
            <p class="h-4 w-full skeleton"></p>
            </td>
            <td > <p class="h-4 w-full skeleton"></p></td>
            <td
           
            >
            <p class="h-4 w-full skeleton"></p>
            </td>
            <td> <p class="h-4 w-full skeleton"></p></td>
            <td> <p class="h-4 w-full skeleton"></p></td>
            <td class="relative">
              <p class="h-4 w-full skeleton"></p>
            
            </td>
          </tr>
        </tbody>
      </table>  
    </div>
   
  </div>
</template>

<script setup>

</script>

<style  scoped>


</style>