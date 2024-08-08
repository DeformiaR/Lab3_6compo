<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
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
const edit = () => {
  store.updateMessage('You are successufully edit for ' + props.passenger.name)
  setTimeout(() => {
    store.resetMessage()
  }, 5000)
  router.push({ name: 'passenger-list-view', params: { id: props.passenger._id } })
}
</script>

<template>
  <p>Edit passenger here</p>
  <button @click="edit">Edit Me</button>
</template>
