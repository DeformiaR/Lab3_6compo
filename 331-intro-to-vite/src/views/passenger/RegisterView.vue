<script setup lang="ts">
import { toRefs, defineProps, useAttrs } from 'vue'
import { type Passenger } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  passenger: Passenger
  id: String
}>()
const { passenger } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
  store.updateMessage('You are successufully registered for ' + props.passenger.name)
  setTimeout(() => {
    store.resetMessage()
  }, 5000)
  router.push({ name: 'passenger-detail-view', params: { id: props.passenger._id } })
}
</script>

<template>
  <p>Register passenger here</p>
  <button @click="register">Register</button>
</template>
