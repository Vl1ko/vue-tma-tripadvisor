<script>
import { ref } from 'vue'
export default {
  props: ['contact'],
  setup(props) {
    const contact = ref(props.contact)

    return {
      contact
    }
  }
}
</script>
<template>
  <div>{{ contact }}</div>
</template>
