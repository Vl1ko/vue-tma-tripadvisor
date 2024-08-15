<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { initBackButton, initMainButton } from '@tma.js/sdk'

export default {
  name: 'UserPage',
  props: [
    'id',
    'avatar',
    'name',
    'services',
    'cities',
    'description',
    'tg',
    'phone1',
    'phone2',
    'inst',
    'vk',
    'promo',
    'tg_id'
  ],
  setup(props) {
    const router = useRouter()
    const [backButton] = initBackButton()
    backButton.on('click', () => {
      mainButton.setParams({
        isVisible: false,
        isEnabled: false
      })
      router.push({ name: 'home' })
    })

    const [mainButton] = initMainButton()
    mainButton.setParams({
      backgroundColor: '#007aff',
      text: 'Написать',
      isVisible: true,
      isEnabled: true
    })

    mainButton.on('click', () => {
      const redirect = document.getElementById('tgID').innerHTML.slice(1)
      window.location.href = String('http://t.me/') + String(redirect)
      mainButton.setParams({
        backgroundColor: '#007aff',
        text: 'Написать',
        isVisible: false,
        isEnabled: false
      })
      return
      // console.log(document.getElementById('tgID').innerHTML.slice(1))
      // console.log(String('http://t.me/') + String(redirect))
    })

    onMounted(() => {
      backButton.show()
    })

    const isAdmin = localStorage.getItem('IsAdmin')

    const user_id = ref(props.id)
    const user_avatar = ref(props.avatar)
    const user_name = ref(props.name)
    const user_services = ref(props.services)
    const user_cities = ref(props.cities)
    const user_description = ref(props.description)
    const user_tg = ref(props.tg)
    const user_phone1 = ref(props.phone1)
    const user_phone2 = ref(props.phone2)
    const user_inst = ref(props.inst)
    const user_vk = ref(props.vk)
    const user_promo = ref(props.promo)
    const tg_id = ref(props.tg_id)

    return {
      user_id,
      user_avatar,
      user_name,
      user_services,
      user_cities,
      user_description,
      user_tg,
      user_phone1,
      user_phone2,
      user_inst,
      user_vk,
      user_promo,
      isAdmin,
      tg_id,
      mainButton
    }
  },

  methods: {
    servicesRender() {},
    tgredirect() {
      const redirect = document.getElementById('tgID').innerHTML.slice(1)
      window.location.href = String('Https://t.me/') + String(redirect)
    },
    instredirect() {
      const redirect = document.getElementById('instID').innerHTML
      window.location.href = String('https://www.instagram.com/') + String(redirect)
    },
    vkredirect() {
      const redirect = document.getElementById('vkID').innerHTML
      window.location.href = String('Https://vk.com/') + String(redirect)
    },

    call1redirect() {
      const redirect = document.getElementById('nphone1').innerHTML
      window.open('tel:' + String(redirect))
    },
    call2redirect() {
      const redirect = document.getElementById('nphone2').innerHTML
      window.open('tel:' + String(redirect))
    }
  }
}
</script>

<template>
  <div className="flex-col bg-auto m-3 h-screen">
    <div class="relative bg-[#f6f8f7] rounded-3xl p-3">
      <div class="flex m-1">
        <img class="rounded-full w-32 h-32" :src="avatar" />
        <div class="ml-5">
          <h1 class="font-medium tracking-tight text-xl mb-2">{{ name }}</h1>
          <div class="flex mb-2">
            <img class="h-5 w-5" src="/src/assets/location.svg" />
            <h2>{{ user_cities }}</h2>
          </div>
          <div class="flex items-center flex-wrap">
            <h3 class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1">
              {{ user_services.split(/,/g)[0] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[1]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[1] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[2]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[2] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[3]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[3] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[4]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[4] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[5]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[5] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[6]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[6] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[7]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[7] }}
            </h3>
            <h3
              v-if="user_services.split(/,/g)[8]"
              class="mr-1 tracking-tight bg-[#007aff] rounded-xl text-white p-0.5 px-1.5 mb-1"
            >
              {{ user_services.split(/,/g)[8] }}
            </h3>
          </div>
        </div>
      </div>
      <div class="whitespace-pre-line">
        <h1 class="tracking-tight underline underline-offset-2 text-xl mb-3">Краткое описание</h1>
        <p>{{ user_description }}</p>
      </div>
    </div>
    <div class="bg-[#f6f8f7] rounded-3xl p-3 mt-3">
      <h1 class="tracking-tight underline underline-offset-2 text-xl mb-3">Контакты</h1>
      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/telegram.svg" />
        <p class="font-medium text-lg" id="tgID" name="tgID" :value="user_tg" @click="tgredirect()">
          {{ user_tg }}
        </p>
      </div>
      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/phone.svg" alt="" />
        <p
          class="font-medium text-lg"
          id="nphone1"
          name="nphone1"
          type="number"
          @click="call1redirect()"
        >
          {{ user_phone1 }}
        </p>
      </div>
      <div class="flex items-center mb-2" v-if="user_phone2 != ' '">
        <img class="h-5 mr-5" src="../assets/phone.svg" alt="" />
        <p
          class="font-medium text-lg"
          id="nphone2"
          name="nphone2"
          type="number"
          @click="call2redirect()"
        >
          {{ user_phone2 }}
        </p>
      </div>
      <div v-if="user_inst != ' '" class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/instagram.svg" alt="" />
        <p class="font-medium text-lg" id="instID" @click="instredirect()">{{ user_inst }}</p>
      </div>
      <div v-if="user_vk != ' '" class="flex items-center mb-2">
        <img class="h-4 mr-3" src="../assets/vk.svg" alt="" />
        <p class="font-medium text-lg" id="vkID" @click="vkredirect()">{{ user_vk }}</p>
      </div>
    </div>
    <div v-if="user_promo.length > 1" class="bg-[#f6f8f7] rounded-3xl p-3 mt-3">
      <h1 class="tracking-tight underline underline-offset-4 text-xl mb-3">Промокод</h1>
      <div class="flex items-center mb-2">
        <p class="font-bold text-xl text-[#007aff] mr-3">-{{ user_promo.split(',')[0] }}%</p>
        <p class="font-medium text-lg">{{ user_promo.split(',')[1].toUpperCase() }}</p>
      </div>
    </div>
    <div class="grid place-items-stretch" v-if="isAdmin === 'True'">
      <button
        class="py-4 px-4 bg-[#007aff] rounded-xl text-white font-base text-lg mb-3 mt-3"
        @click="
          $router.push({
            name: 'edit',
            params: {
              id: user_id,
              avatar: user_avatar,
              name: user_name,
              services: String(user_services),
              cities: user_cities,
              description: user_description,
              tg: user_tg,
              phone1: user_phone1,
              phone2: user_phone2,
              inst: user_inst,
              vk: user_vk,
              promo: String(user_promo)
            }
          })
        "
      >
        Редактировать
      </button>
    </div>
  </div>
</template>
