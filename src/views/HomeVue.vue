<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

import UserList from '../components/UserList.vue'
import AboutView from '../views/AboutView.vue'
import NoItemsView from '../views/NoItemsView.vue'
import { BotTOKEN } from '../env.js'
import { initBackButton, initMainButton, initClosingBehavior, initMiniApp } from '@tma.js/sdk'
import { comma } from 'postcss/lib/list'

console.log(window.location.href, 'url')

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

const router = useRouter()

const props = defineProps({
  Sort: {
    type: String,
    default: ''
  }
})

console.log(props.Sort, 'ПРОПСЫ')

var chek
var length
var isAdmin
const items = ref([])
const tg = window.Telegram.WebApp
tg.ready()
tg.isClosingConfirmationEnabled = true

console.log(tg, 'webApp')
console.log(tg.initDataUnsafe.user.id, 'ID')
console.log(tg.initDataUnsafe.user.photo_url, 'userPh')

const filters = reactive({
  SortBy: '',
  searchQuery: ''
})

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

const fetchItems = async () => {
  try {
    var { data } = await axios.get(
      'https://fded5c522e62b95f.mokky.dev/items?cities=*' +
        filters.searchQuery +
        '*' +
        '&services=*' +
        localStorage.getItem('filter') +
        '*'
    )
    length = data.length
    items.value = shuffle(data)
    // console.log('data', data)
    // console.log('length', data.length)
    // console.log(
    //   'https://fded5c522e62b95f.mokky.dev/items?cities=*' +
    //     filters.searchQuery +
    //     '*' +
    //     '&services=*' +
    //     localStorage.getItem('filter') +
    //     '*'
    // )
    // items.value = shuffle(data)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const DataUser = await axios.get(
    'https://fded5c522e62b95f.mokky.dev/items?userID=' + tg.initDataUnsafe.user.id
  )

  console.log(isAdmin)
  const [backButton] = initBackButton()
  backButton.hide()
  const [mainButton] = initMainButton()
  mainButton.disable()
  mainButton.hide()
  if (tg.initDataUnsafe.user.id == 422047213 || tg.initDataUnsafe.user.id == 705559369) {
    isAdmin = 'True'
    localStorage.setItem('IsAdmin', isAdmin)
  } else {
    isAdmin = DataUser.data[0].isAdmin
    localStorage.setItem('IsAdmin', isAdmin)
  }
})

onMounted(() => {
  filters.searchQuery = localStorage.getItem('inputHistory')
})
onMounted(fetchItems)
onMounted(botCheck)

addEventListener('web_app_close', () => localStorage.clear())

const onChangeSortSelect = (event) => {
  console.log(event.target.value)
  filters.SortBy = event.target.value
}

const [closingBehavior] = initClosingBehavior()
closingBehavior.enableConfirmation()

const hash = window.location.hash.slice(1)
console.log(hash)
const params = new URLSearchParams(hash)
console.log(params.get('tgWebAppThemeParams'))

const user = reactive({ name: localStorage.getItem('inputHistory') })

async function getMember() {
  var TOKEN = BotTOKEN
  const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/getChatMember`, {
    chat_id: '@azimuthtravel',
    user_id: tg.initDataUnsafe.user.id
  })
  const isMember = response.data.result.status
  console.log(isMember, 'Подписка')
  if (isMember == 'left') {
    router.push('/member')
  }
}

onMounted(getMember)

function hideMobileKeyboard() {
  this.$refs.input.blur()
}
function showMobileKeyboard() {
  this.$refs.input.focus()
}
console.log(window.innerHeigh)

const input = localStorage.getItem('inputHistory')

if (!localStorage.getItem('filter')) {
  localStorage.setItem('filter', '')
}

onMounted(async () => {
  if (!localStorage.getItem('inputHistory')) {
    localStorage.setItem('inputHistory', '')
    chek = ''
  } else {
    chek = localStorage.getItem('inputHistory')
    filters.searchQuery = localStorage.getItem('inputHistory')
    length = 123
    localStorage.setItem('inputHistory', localStorage.getItem('inputHistory'))
  }
})

watch(user, (newValue) => {
  console.log(newValue.name, 'ввод')
  localStorage.setItem('inputHistory', newValue.name)
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
  <div className="bg-auto height-[var(--tg-viewport-height)]">
    <header className="flex m-3">
      <img className="w-16" src="/logo.svg" />
      <h1 className="font-bold text-3xl m-3">КУДА ПОЕДЕМ</h1>
    </header>
    <div>
      <div class="relative mt-2 rounded-md">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          <span class="text-gray-500 sm:text-sm text-3xl">⌕</span>
        </div>
        <form @submit.prevent="hideMobileKeyboard">
          <input
            class="block ml-3 w-[80%] rounded-lg bg-[#f6f8f7] border-0 py-1.5 pl-9 text-gray-900 placeholder:text-gray-400 focus:ring-white sm:leading-6"
            placeholder="Страна, область, край, город, место"
            type="text"
            name="price"
            id="price"
            v-model="user.name"
          />
        </form>
        <RouterLink to="/filters"
          ><div
            class="absolute inset-y-0 right-3 flex items-center bg-[#f6f8f7] h-9 w-9 rounded-lg"
          >
            <img class="rotate-90" src="../assets/settings.svg" alt="" /></div
        ></RouterLink>
      </div>
      <div v-if="isAdmin === 'True'" class="grid grid-cols-1 m-3">
        <button
          class="py-2 mb-2 bg-[#f6f8f7] rounded-2xl text-[#007aff] font-base text-lg"
          @click="$router.push({ path: '/add' })"
        >
          Добавить контакт
        </button>
        <button
          class="py-2 mb-2 bg-[#f6f8f7] rounded-2xl text-[#007aff] font-base text-lg"
          @click="$router.push({ path: '/admins' })"
        >
          Администраторы
        </button>
        <button
          class="py-2 mb-2 bg-[#f6f8f7] rounded-2xl text-[#007aff] font-base text-lg"
          @click="$router.push({ path: '/allcontacts' })"
        >
          Все контакты
        </button>
      </div>
    </div>
    <div v-if="chek == ''">
      <AboutView />
    </div>
    <div v-else-if="length < 1 && chek != ''"><NoItemsView /></div>
    <div v-else>
      <UserList :items="items" />
      <div class="h-96"></div>
    </div>
  </div>
</template>
<style>
<header > {
  font-family: 'MainFont';
}
</style>
