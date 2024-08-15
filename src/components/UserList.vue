<script setup>
import { watch } from 'vue'
import User from './User.vue'
import { routeLocationKey } from 'vue-router'

defineProps({
  items: Array
})

var counter = 0
watch(counter, (newValue) => {
  console.log(newValue)
})
</script>

<template>
  <div>
    <User
      v-for="item in items"
      :key="item.id"
      :avatar="item.avatar"
      :UserName="item.name"
      :services="item.services"
      :cities="item.cities"
      :description="item.description"
      :tg="item.tg"
      :phone1="item.phone1"
      :phone2="item.phone2"
      :inst="item.inst"
      :vk="item.vk"
      :promo="item.promo"
      :tg_id="item.userID"
      @click="
        $router.push({
          name: 'user',
          params: {
            id: item.id,
            avatar: item.avatar,
            name: item.name,
            services: String(item.services),
            cities: item.cities,
            description: item.description,
            tg: item.tg,
            phone1: item.phone1,
            phone2: item.phone2,
            inst: item.inst,
            vk: item.vk,
            promo: String(item.promo),
            tg_id: item.userID
          }
        })
      "
    />
  </div>
</template>
