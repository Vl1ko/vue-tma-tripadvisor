<script setup>
function tgredirect() {
  window.location.href = String('https://t.me/azimuthtravel')
}
</script>

<template>
  <div class="mt-20">
    <div className="bg-[#f6f8f7] rounded-3xl ml-5 mr-5 p-5">
      <img className="w-24 m-auto" src="/logo.svg" />
      <h1 className="text-center m-auto"><b>АЗИМУТ | ПУТЕШЕСТВИЯ</b></h1>
      <p className="text-center m-auto">
        Доступ к базе контактов будет открыт после того, как вы подпишитесь на наш телеграм канал
      </p>
      <div class="grid place-items-stretch">
        <button
          class="py-4 px-4 mt-5 mb-2 bg-[#007aff] rounded-xl text-white font-base text-lg"
          @click="tgredirect()"
        >
          Подписаться
        </button>
      </div>
    </div>
  </div>
</template>
