<script setup>
import Search from './components/Search.vue'
</script>

<template>
  <h1 class="text-5xl font-bold padding-bottom">
    Movie Database
  </h1>
  <div id="searchdiv">
    <Search/>
  </div>
  

</template>

<style scoped>
  .searchdiv{
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }
</style>
