<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    resourse: string
  }>(),
  {
    resourse: 'page'
  }
)
</script>
<template>
  <h1>Oops!</h1>
  <h3>The page you're looking for is not here.</h3>
  <router-link :to="{ name: 'passenger-list-view' }">Back to the home page</router-link>
</template>
