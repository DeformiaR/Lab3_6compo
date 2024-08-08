<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  event: Event
  id: String
}>()

const { event } = toRefs(props)

const router = useRouter()

const register = () => {
  // If...
  // Push...
  router.push({ name: 'event-detail-view' })
}
</script>
<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
