<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    if(window.location.hash) {
      axios.post('/api/login', {access_token: window.location.hash.substring(15)}).then(res => {
        console.log(res);
        if(res.data != "")
          this.$router.push('/playlist/' + res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style>
body {
    background: black;
}
</style>
