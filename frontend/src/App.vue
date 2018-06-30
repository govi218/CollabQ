<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    console.log(window.location);
  }
}
</script>

<style>
body {
    background: black;
}
</style>
