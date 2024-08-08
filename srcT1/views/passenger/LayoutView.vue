<script setup lang="ts">
import { usePassengerStore } from '@/stores/passenger'
import { storeToRefs } from 'pinia'

const store = usePassengerStore()
const { passenger } = storeToRefs(store)
</script>

<template>
  <h1>Passenger in this Airline</h1>
  <div v-if="passenger">
    <nav>
      <router-link :to="{ name: 'passenger-detail-view' }">Detail</router-link>
      |
      <router-link :to="{ name: 'passenger-register-view' }">Register</router-link>
      |
      <router-link :to="{ name: 'passenger-edit-view' }">Edit</router-link>
    </nav>
    <RouterView :passenger="passenger"></RouterView>
  </div>
</template>
