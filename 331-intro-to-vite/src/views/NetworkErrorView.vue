<template>
  <div class="networkError">
    <h1>Uh-oh!</h1>
    <h3>It looks like you're experiencing some network issue, plese take a breath and</h3>
    <a href="#" @click="$router.go(-1)">click here</a> to try again.
  </div>
</template>
