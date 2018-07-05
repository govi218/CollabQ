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
      let url = window.location.hash.split('=');
      url.shift();
      const AT = url;
      axios.post('/api/login', {access_token: AT}).then(res => {
        if(res.data.access_token)
          this.$router.push('/playlist/' + res.data.id + '-' + res.data.access_token);
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
