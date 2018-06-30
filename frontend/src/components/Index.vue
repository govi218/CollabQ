<template>
<div class="container index">
    <div class="row">
      <Queue></Queue>
      <Collabs></Collabs>
      <AddSongs></AddSongs>
    </div>
</div>
</template>

<script>
  import Queue from '@/components/Queue'
  import Collabs from '@/components/Collabs'
  import AddSongs from '@/components/AddSongs'
  export default {
    name: 'Index',
    data() {
      return {
        access_token: ''
      }
    },
    components: {
      Queue,
      Collabs,
      AddSongs
    },
    created() {
      console.log('here');
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
    margin-top: 60px;
}
</style>
