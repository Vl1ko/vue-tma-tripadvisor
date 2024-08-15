<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { initMainButton, initBackButton } from '@tma.js/sdk'
import { BotTOKEN } from '@/env'

export default {
  name: 'EditPage',
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
    const [mainButton] = initMainButton()
    const [backButton] = initBackButton()
    onMounted(
      backButton.hide(),
      mainButton.setParams({
        isVisible: false,
        isEnabled: false
      }),
      backButton.show()
    )
    function userUpdate() {
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
      const Admin = document.getElementById('Admin').value
      const user_id = document.getElementById('user_id').value

      axios
        .patch('https://fded5c522e62b95f.mokky.dev/items/' + user_id, {
          name: name,
          cities: cities,
          services: services,
          description: description,
          tg: tg,
          phone1: phone1,
          phone2: phone2,
          inst: inst,
          vk: vk,
          promo: promo.split(' '),
          avatar: avatar,
          isAdmin: Admin
        })
        .then((response) => {
          console.log(response)
          window.TelegramWebviewProxy.postEvent('web_app_open_popup', succesData())
          // window.location.replace('https://azimuttravel.ru')
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

      console.log(name, cities, services, description, tg, phone1, phone2, inst, vk, promo)
    }

    function userDelete() {
      // const router = useRouter()
      const user_id = document.getElementById('user_id').value

      axios.delete('https://fded5c522e62b95f.mokky.dev/items/' + user_id)
      window.TelegramWebviewProxy.postEvent('web_app_open_popup', succesDel())
      router.push({
        name: 'home'
      })
    }

    function succesData() {
      return JSON.stringify({
        title: 'Успешно!',
        message: 'Запись успешно отредактирована!',
        buttons: [{ id: 'OkButton', type: 'ok', text: 'Понятно' }]
      })
    }

    function succesDel() {
      return JSON.stringify({
        title: 'Успешно!',
        message: 'Запись успешно удалена!',
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
      succesData,
      BadInput,
      BadData,
      BadPath,
      BadRoute,
      userUpdate,
      userDelete
    }
  }
}
</script>

<template>
  <div className="flex-col bg-auto m-3 h-screen">
    <div class="relative bg-[#f6f8f7] rounded-3xl p-3">
      <div class="flex p-3">
        <img class="rounded-full w-24 h-24" :src="avatar" />

        <div class="ml-5">
          <input
            id="name"
            class="font-base tracking-tight text-base mb-2 pl-2 rounded-full"
            placeholder="Имя Фамилия"
            :value="name"
          />

          <div class="flex mb-2">
            <img class="h-5 w-5" src="/src/assets/location.svg" />
            <input
              id="cities"
              class="font-base tracking-tight text-base pl-2 rounded-full"
              type="text"
              placeholder="Город/Место"
              :value="user_cities"
            />
          </div>

          <input
            id="services"
            class="font-base tracking-tight text-base pl-2 mb-2 rounded-full"
            type="text"
            placeholder="Виды услуг"
            :value="user_services"
          />

          <input
            id="userID"
            class="font-base tracking-tight text-base pl-2 mb-2 rounded-full"
            type="text"
            placeholder="ID пользователя"
            :value="tg_id"
          />
          <div class="flex">
            <p>ID пользователя в базе:</p>
            <input
              id="user_id"
              class="font-base tracking-tight text-base pl-2 mb-2 rounded-full w-10"
              type="text"
              placeholder="ID пользователя в базе"
              :value="user_id"
            />
          </div>
          <input
            id="avatar"
            class="font-base tracking-tight text-base pl-2 mb-2 rounded-full"
            type="text"
            placeholder="Ссылка на аватар"
            :value="user_avatar"
          />

          <div class="flex">
            <p>Роль Администратора</p>
            <select id="Admin" class="ml-2">
              <option value="False">Нет</option>
              <option value="True">Да</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h1 class="tracking-tight underline underline-offset-2 text-xl mb-3">Краткое описание</h1>
        <textarea
          id="description"
          class="resize-none w-full h-48 p-1 rounded-2xl"
          type="text"
          placeholder="Краткое описание"
          :value="user_description"
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
          :value="user_tg"
        />
      </div>

      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/phone.svg" alt="" />
        <input
          id="phone1"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="phone"
          placeholder="Телефон"
          :value="user_phone1"
        />
      </div>

      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/phone.svg" alt="" />
        <input
          id="phone2"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="phone"
          placeholder="Телефон"
          :value="user_phone2"
        />
      </div>

      <div class="flex items-center mb-2">
        <img class="h-5 mr-5" src="../assets/instagram.svg" alt="" />
        <input
          id="inst"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="text"
          placeholder="Инстраграм"
          :value="user_inst"
        />
      </div>

      <div class="flex items-center mb-2">
        <img class="h-4 mr-3" src="../assets/vk.svg" alt="" />
        <input
          id="vk"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="text"
          placeholder="ВКонтакте"
          :value="user_vk"
        />
      </div>
    </div>

    <div class="bg-[#f6f8f7] rounded-3xl p-3 mt-3">
      <h1 class="tracking-tight underline underline-offset-4 text-xl mb-3">Промокод</h1>
      <div class="flex items-center mb-2">
        <input
          id="promo"
          class="font-base tracking-tight text-base pl-2 rounded-full"
          type="text"
          placeholder="15 АЗИМУТ"
          :value="user_promo.split(',')[0] + ' ' + user_promo.split(',')[1].toUpperCase()"
        />
      </div>
    </div>
    <div class="grid place-items-stretch">
      <button
        class="py-4 px-4 mt-2 mb-2 bg-[#e64d44] rounded-xl text-white font-base text-lg"
        @click="userDelete()"
      >
        Удалить пользователя
      </button>
      <button
        class="py-4 px-4 mb-2 bg-[#007aff] rounded-xl text-white font-base text-lg"
        @click="userUpdate()"
      >
        Редактировать пользователя
      </button>
    </div>
    <div class="h-96"></div>
  </div>
</template>
