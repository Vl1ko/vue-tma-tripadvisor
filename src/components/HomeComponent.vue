<script setup>
import { ref, onMounted, watch, reactive } from 'vue'

import axios from 'axios'

import UserList from '../components/UserList.vue'
import AboutView from '../views/AboutView.vue'
import NoItemsView from '../views/NoItemsView.vue'

var chek = ''
var length
const items = ref([])

const filters = reactive({
  SortBy: '',
  searchQuery: ''
})

const fetchItems = async () => {
  try {
    const { data } = await axios.get(
      'https://fded5c522e62b95f.mokky.dev/items?services=*' +
        filters.SortBy +
        '*&cities=*' +
        filters.searchQuery +
        '*'
    )
    items.value = data
    length = data.length
    console.log('length', data.length)
  } catch (err) {
    console.log(err)
  }
}

const onChangeSortSelect = (event) => {
  console.log(event.target.value)
  filters.SortBy = event.target.value
}

onMounted(fetchItems)

const user = reactive({ name: '' })
watch(user, (newValue) => {
  console.log(newValue.name)
  chek = newValue.name
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
      <h1 className="font-bold text-3xl m-3">КУДА ПОЕДЕМ</h1>
    </header>
    <div>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="text-gray-500 sm:text-sm">⌕</span>
        </div>
        <input
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Страна, область, республика..."
          type="text"
          name="price"
          id="price"
          v-model="user.name"
        />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <label for="currency" class="sr-only">Currency</label>
          <select
            @change="onChangeSortSelect"
            id="currency"
            name="currency"
            class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm"
          >
            <option value="">Все услуги</option>
            <option>Туры</option>
            <option>Гиды</option>
            <option>Экскурсии</option>
            <option value="transfer">Трансфер</option>
            <option value="habitation">Проживание</option>
            <option value="entertainments">Развлечения</option>
            <option value="hiking">Походы</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="chek == ''"><AboutView /></div>
    <div v-else><UserList :items="items" /></div>
    <p v-if="length < 1 && chek != ''"><NoItemsView /></p>
  </div>
</template>
