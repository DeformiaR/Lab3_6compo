<script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import PassengerService from '@/services/PassengerService'
import { type Passenger } from '@/types'

const passengers = ref<Passenger[] | null>(null)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const totalPassengers = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / 3)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    PassengerService.getPassengers(3, page.value)
      .then((response) => {
        console.log(response.data)
        passengers.value = response.data.data
        totalPassengers.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Passengers of this Airline</h1>
  <div class="passengers">
    <PassengerCard v-for="passenger in passengers" :key="passenger._id" :passenger="passenger" />

    <div class="pagination">
      <RouterLink
        :to="{ name: 'passenger-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </RouterLink>
      <RouterLink :to="{ name: 'passenger-list-view', query: { page: page + 1 } }" rel="next">
        Next Page
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.passengers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
