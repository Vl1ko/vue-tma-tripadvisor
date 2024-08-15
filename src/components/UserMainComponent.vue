<script setup>
defineProps({
  avatar: String,
  name: String,
  cities: String,
  services: String
})
</script>

<template>
  <div v-if="check != -1" className="bg-auto">
    <div class="relative bg-[#f6f8f7] rounded-3xl m-3">
      <div class="flex p-3">
        <img class="rounded-full w-24 h-24" :src="avatar" />
        <div class="ml-5">
          <h1 class="font-medium tracking-tight text-base mb-2">{{ name }}</h1>
          <div class="flex mb-2">
            <img class="h-5 w-5" src="/src/assets/location.svg" />
            <h2>{{ cities }}</h2>
          </div>
          <h3>{{ services }}</h3>
        </div>
      </div>
      <div>
        <h1>Краткое описание</h1>
        <p>info</p>
      </div>
    </div>
    <div>
      <h1>Контакты</h1>
      <div>
        <img src="" alt="" />
        <p>tgId</p>
      </div>
      <div>
        <img src="" alt="" />
        <p>Phone</p>
      </div>
      <div>
        <img src="" alt="" />
        <p>Inst</p>
      </div>
      <div>
        <img src="" alt="" />
        <p>vk</p>
      </div>
    </div>
    <div>
      <h1>Промокод</h1>
      <p>%</p>
      <p>promo</p>
    </div>
    <div>
      <button>Написать</button>
    </div>
  </div>

  <div v-else>
    <p>Пользователь не найден</p>
  </div>
</template>
