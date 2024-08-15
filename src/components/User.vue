<script setup>
import { onMounted } from 'vue'

const props = defineProps({
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

const service = props.services.filter(function (letter) {
  return letter !== localStorage.getItem('filter')
})
if (localStorage.getItem('filter').length > 1) {
  service.unshift(localStorage.getItem('filter'))
}

console.log(service)
</script>

<template>
  <div class="flex text-center bg-[#f6f8f7] rounded-lg m-3">
    <img class="rounded-full w-12 h-12 m-3" :src="avatar" />
    <div class="ml-0 m-3">
      <div class="flex justify-between">
        <h2 class="font-medium tracking-tight text-base">{{ UserName }}</h2>
        <div class="flex absolute right-3">
          <img class="h-5 w-5" src="/src/assets/location.svg" />
          <p v-if="String(cities.length) > 8" class="font-medium tracking-tight text-base mr-2">
            {{ String(cities.slice(0, 8)) + '...' }}
          </p>
          <p v-else class="font-medium tracking-tight text-base mr-2">
            {{ String(cities.slice(0, 8)) }}
          </p>
        </div>
      </div>
      <div class="flex mt-1">
        <p class="mr-2 text-xs tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5">
          {{ service[0] }}
        </p>
        <p
          class="mr-2 text-xs tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5"
          v-if="service[1]"
        >
          {{ service[1] }}
        </p>
        <p
          class="mr-2 text-xs tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5"
          v-if="service[2]"
        >
          {{ service[2] }}
        </p>
        <p
          class="mr-2 text-xs tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5"
          v-if="service[3] && String(services).length <= 33"
        >
          {{ service[3] }}
        </p>
      </div>
    </div>
  </div>
</template>
