<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Passenger } from '@/types'

const props = defineProps<{
  passenger: Passenger
  id: String
}>()
const { passenger } = toRefs(props)
</script>

<template>
  <div v-if="passenger">
    <h2>{{ passenger.name }}</h2>
    <span>Trips: {{ passenger.trips }}</span>

    <div v-for="airline in passenger.airline" :key="airline._id" class="airline-details">
      <img :src="airline.logo" alt="Airline Logo" class="airline-logo" />
      <h3>{{ airline.name }}</h3>
      <p>Country: {{ airline.country }}</p>
      <p>
        Website: <a :href="'http://' + airline.website" target="_blank">{{ airline.website }}</a>
      </p>
      <p>Established: {{ airline.established }}</p>
    </div>
  </div>
</template>
