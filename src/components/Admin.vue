<script setup>
import { onMounted } from 'vue'

defineProps({
  avatar: String,
  UserName: String,
  services: Array,
  cities: String,
  description: String,
  tg: String,
  phone1: String,
  phone2: String,
  inst: String,
  vk: String,
  promo: Array,
  tg_id: String
})
</script>

<template>
  <div class="flex text-center bg-[#f6f8f7] rounded-lg m-3">
    <img class="rounded-full w-12 h-12 m-3" :src="avatar" />
    <div class="ml-0 m-3">
      <div class="flex justify-between">
        <h2 class="font-medium tracking-tight text-base">{{ UserName }}</h2>
      </div>
      <div class="flex mt-1">
        <p class="font-medium tracking-tight text-base">{{ tg }}</p>
      </div>
    </div>
  </div>
</template>
