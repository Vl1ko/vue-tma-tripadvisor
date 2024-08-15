<script setup>
defineProps({
  items: Array
})

console.log(items)
</script>

<template>
  <UserMainComponent
    v-for="item in items"
    :key="item.id"
    :avatar="item.avatar"
    :name="item.name"
    :cities="item.cities"
    :services="item.services"
  />
</template>
