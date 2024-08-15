<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { initBackButton } from '@tma.js/sdk'
import { BotTOKEN } from '@/env'

const router = useRouter()
const [backButton] = initBackButton()
backButton.show()
backButton.on('click', () => {
  router.push({ name: 'home' })
})

function succesData() {
  return JSON.stringify({
    title: 'Успешно!',
    message: 'Пользователь успешно добавлен в базу!',
    buttons: [{ id: 'OkButton', type: 'ok', text: 'Понятно' }]
  })
}

function BadInput() {
  return JSON.stringify({
    title: 'Неудача!',
    message: 'Указаны не все обязательные параметры',
    buttons: [{ id: 'OkButton', type: 'ok', text: 'Понятно' }]
  })
}

function BadData(error) {
  return JSON.stringify({
    title: 'Неудача!',
    message: 'Неопознанная ошибка:\n' + error,
    buttons: [{ id: 'OkButton', type: 'ok', text: 'Понятно' }]
  })
}

function BadPath(error) {
  return JSON.stringify({
    title: 'Неудача!',
    message: 'Error getting file path:\n' + error,
    buttons: [{ id: 'OkButton', type: 'ok', text: 'Понятно' }]
  })
}

function BadRoute(error) {
  return JSON.stringify({
    title: 'Неудача!',
    message: 'Error getting user profile photos:\n' + error,
    buttons: [{ id: 'OkButton', type: 'ok', text: 'Понятно' }]
  })
}

async function sendFile(file) {
  const formdata = new FormData()
  formdata.append('image', file, 'image.png')

  const resp = await fetch('media/upload-image', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
      body: formdata
    }),
    respData = await resp.json()

  if (resp.status !== 200) {
    throw new Error(respData.message)
  }

  return respData
}

async function userAdd() {
  var token = BotTOKEN
  var userId = document.getElementById('userID').value
  var name = document.getElementById('name').value
  var cities = document.getElementById('cities').value
  var services = document.getElementById('services').value.replace(/ /g, '').split(',')
  var description = document.getElementById('description').value
  var tg = document.getElementById('tgID').value
  var phone1 = document.getElementById('phone1').value
  var phone2 = document.getElementById('phone2').value
  var avatar = document.getElementById('avatar').value
  if (
    name.length < 1 ||
    cities.length < 1 ||
    services.length < 1 ||
    description.length < 1 ||
    tg.length < 1 ||
    phone1.length < 1 ||
    avatar.length < 1
  ) {
    window.TelegramWebviewProxy.postEvent('web_app_open_popup', BadInput())
    return
  }

  if (phone2.length < 1) {
    phone2 = ' '
  }
  var inst = document.getElementById('inst').value
  if (inst.length < 1) {
    inst = ' '
  }
  var vk = document.getElementById('vk').value
  if (vk.length < 1) {
    vk = ' '
  }
  var promo = document.getElementById('promo').value
  if (promo.length < 1) {
    promo = ' '
  }

  axios
    .post('https://fded5c522e62b95f.mokky.dev/items', {
      name: name,
      cities: cities,
      services: services,
      description: description,
      userID: userId,
      tg: tg,
      phone1: phone1,
      phone2: phone2,
      inst: inst,
      vk: vk,
      promo: promo.split(' '),
      avatar: avatar,
      isAdmin: false
    })
    .then((response) => {
      console.log(response)
      window.TelegramWebviewProxy.postEvent('web_app_open_popup', succesData(response))
      router.push({
        name: 'home'
      })
      return
    })
    .catch((error) => {
      console.error(error)
      window.TelegramWebviewProxy.postEvent('web_app_open_popup', BadData(error))
      return
    })

  console.log(name, cities, services, description, tg, phone1, phone2.avatar, inst, vk, promo)
}
</script>
<template>
  <div className="flex-col bg-auto m-3 h-screen">
    <div class="relative bg-[#f6f8f7] rounded-3xl p-3">
      <div class="flex p-3">
        <div class="flex flex-col m-0">
          <input
            id="name"
            class="font-base tracking-tight text-base mb-2 pl-2 rounded-full"
            placeholder="Имя Фамилия"
          />
          <div class="flex mb-2">
            <img class="h-5 w-5" src="/src/assets/location.svg" />
            <input
              id="cities"
              class="font-base tracking-tight text-base pl-2 rounded-full"
              type="text"
              placeholder="Город/Место"
            />
          </div>
          <input
            id="services"
            class="font-base tracking-tight text-base pl-2 mb-2 rounded-full"
            type="text"
            placeholder="Виды услуг"
          />
          <input
            id="userID"
            class="font-base tracking-tight text-base pl-2 mb-2 rounded-full"
            type="text"
            placeholder="ID пользователя"
          />
          <input
            id="avatar"
            class="font-base tracking-tight text-base pl-2 rounded-full"
            type="text"
            placeholder="Ссылка на аватар"
          />
        </div>
      </div>
      <div>
        <h1 class="tracking-tight underline underline-offset-2 text-xl mb-3 rounded-full">
          Краткое описание
        </h1>
        <textarea
          id="description"
          class="resize-none w-full h-48 p-1 rounded-2xl"
          type="text"
          placeholder="Краткое описание"
        ></textarea>
      </div>
    </div>
    <div class="bg-[#f6f8f7] rounded-3xl p-3 mt-3">
      <h1 class="tracking-tight underline underline-offset-2 text-xl mb-3">Контакты</h1>
      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/telegram.svg" />
        <input
          class="font-base tracking-tight text-base pl-2 rounded-full"
          id="tgID"
          name="tgID"
          type="text"
          placeholder="Телеграм"
        />
      </div>
      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/phone.svg" alt="" />
        <input
          id="phone1"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="phone"
          placeholder="Телефон"
        />
      </div>
      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/phone.svg" alt="" />
        <input
          id="phone2"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="phone"
          placeholder="Телефон"
        />
      </div>
      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/instagram.svg" alt="" />
        <input
          id="inst"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="text"
          placeholder="Инстраграм"
        />
      </div>
      <div class="flex items-center mb-2">
        <img class="h-4 mr-3" src="../assets/vk.svg" alt="" />
        <input
          id="vk"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="text"
          placeholder="ВКонтакте"
        />
      </div>
    </div>
    <div class="bg-[#f6f8f7] rounded-3xl p-3 mt-3 mb-5">
      <h1 class="tracking-tight underline underline-offset-4 text-xl mb-3">Промокод</h1>
      <div class="flex items-center mb-2">
        <input
          id="promo"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="text"
          placeholder="15 АЗИМУТ"
        />
      </div>
    </div>
    <div class="grid place-items-stretch">
      <button
        class="py-4 px-4 bg-[#007aff] rounded-xl text-white font-base text-lg"
        @click="userAdd()"
      >
        Добавить пользователя
      </button>
    </div>
    <div class="h-96"></div>
  </div>
</template>
