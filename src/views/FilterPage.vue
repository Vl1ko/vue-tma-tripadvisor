<script setup>
import { onMounted, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { initBackButton, initMainButton } from '@tma.js/sdk'
import { document } from 'postcss'

const router = useRouter()

const [backButton] = initBackButton()
backButton.show()
backButton.on('click', () => {
  router.push({ name: 'home' })
})
var SortBy = ' '
const [mainButton] = initMainButton()

mainButton.setParams({
  isVisible: false,
  isEnabled: false
})
function ApplyFilter() {
  console.log(SortBy)
  if (SortBy != ' ') {
    router.push({
      name: 'homef',
      params: {
        Sort: SortBy
      }
    })
    localStorage.setItem('filter', SortBy)
  } else {
    router.push({
      name: 'home'
    })
    localStorage.setItem('filter', '')
  }
}

onMounted(async () => {
  const inputs = document.querySelector('input[name="filter"]:checked').value
  console.log(inputs)
})

const inputs = reactive({ name: '', id: '' })

watch(inputs, (newValue) => {
  SortBy = newValue.name
})
</script>

<template>
  <div class="h-screen">
    <div class="flex-col text-xl">
      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="all">Все услуги</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="all"
          name="filter"
          value=" "
          checked="true"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="tours">Туры</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="tours"
          name="filter"
          value="Туры"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="gid">Гид</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="gid"
          name="filter"
          value="Гид"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="Expedition">Экскурсии</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="Expedition"
          name="filter"
          value="Экскурсии"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="tranfer">Трансфер</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="tranfer"
          name="filter"
          value="Трансфер"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="live">Проживание</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="live"
          name="filter"
          value="Проживание"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="razvlecheniya">Развлечения</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="razvlecheniya"
          name="filter"
          value="Развлечения"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="pohod">Походы</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="pohod"
          name="filter"
          value="Походы"
          v-model="inputs.name"
        />
      </div>

      <div class="grid grid-cols-2 ml-2 mb-3 items-center">
        <label for="photo">Фотографы</label>
        <input
          class="h-6 text-right ml-36 accent-[#007aff]"
          type="radio"
          id="photo"
          name="filter"
          value="Фотограф"
          v-model="inputs.name"
        />
      </div>
      <div class="fixed ml-[2.5%] w-[95%] place-items-stretch bottom-10">
        <button
          class="py-4 px-4 mr-3 bg-[#007aff] w-full rounded-xl text-white font-base text-lg"
          @click="ApplyFilter()"
        >
          Применить
        </button>
      </div>
    </div>
  </div>
</template>
