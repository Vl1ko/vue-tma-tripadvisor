<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { initBackButton } from '@tma.js/sdk'

import axios from 'axios'

import NoItemsView from '../views/NoItemsView.vue'
import UserList from '../components/UserList.vue'
import AdminList from '../components/AdminList.vue'

const router = useRouter()
const [backButton] = initBackButton()
backButton.show()
backButton.on('click', () => {
  router.push({ name: 'home' })
})

var chek = ''
var length
var AdminSearch = 'Tr'
const itemsAll = ref([])
const tg = window.Telegram.WebApp
console.log(tg, 'webApp')
console.log(tg.initDataUnsafe.user.id, 'ID')
console.log(tg.initDataUnsafe.user.photo_url, 'userPh')

const filters = reactive({
  SortBy: '',
  searchQuery: ''
})

const userl = reactive({ name: localStorage.getItem('inputHistory') })
watch(userl, (newValue) => {
  console.log(newValue.name, 'ввод')
  localStorage.setItem('inputHistory', newValue.name)
  chek = newValue.name
  filters.searchQuery = newValue.name
  console.log('Длинна', chek.length)
  if (chek.length >= 1) {
    AdminSearch = ''
  } else {
    AdminSearch = 'Tr'
  }
})

const fetchItems = async () => {
  try {
    const { data } = await axios.get(
      `https://fded5c522e62b95f.mokky.dev/items?tg=*${filters.searchQuery}*`
    )
    itemsAll.value = data
    length = data.length
    console.log('data', data)
    console.log('length', data.length)
    console.log('check', chek)
  } catch (err) {
    console.log(err)
  }
}

const botCheck = async () => {
  try {
    if (tg.initDataUnsafe.user.isBot) {
      tg.close()
    } else {
      tg.expand()
    }
  } catch (err) {
    console.log(err)
  }
}

const onChangeSortSelect = (event) => {
  console.log(event.target.value)
  filters.SortBy = event.target.value
}

var alength

onMounted(fetchItems)
onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://fded5c522e62b95f.mokky.dev/items?tg=*${filters.searchQuery}*`
    )
    itemsAll.value = data
    alength = data.length
    console.log('data', data)
    console.log('length', data.length)
    console.log('check', chek)
  } catch (err) {
    console.log(err)
  }
})
onMounted(botCheck)

const user = reactive({ name: '' })
watch(user, (newValue) => {
  console.log(newValue.name)
  filters.searchQuery = newValue.name
})

watch(filters, async () => {
  try {
    fetchItems(filters.SortBy, filters.searchQuery)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div className="bg-auto">
    <header className="flex m-3">
      <img className="w-16" src="/logo.svg" />
      <h1 className="font-bold text-2xl m-3">ВСЕ КОНТАКТЫ</h1>
    </header>
    <div>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="text-gray-500 sm:text-sm">⌕</span>
        </div>
        <input
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Tg login"
          type="text"
          name="price"
          id="price"
          v-model="userl.name"
        />
      </div>
      <p class="text-center m-2">Всего контактов в базе: {{ alength }}</p>
      <div v-if="chek == ''">
        <AdminList :items="itemsAll" />
      </div>
      <div v-else-if="length < 1 && chek != ''"><NoItemsView /></div>
      <div v-else>
        <AdminList :items="itemsAll" />
        <div class="h-96"></div>
      </div>
    </div>
  </div>
</template>
