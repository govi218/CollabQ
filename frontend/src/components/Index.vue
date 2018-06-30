<template>
<div>
  <Navbar></Navbar>
  <div class="container index">
    <div class="row">
      <Queue></Queue>
      <Collabs></Collabs>
      <AddSongs></AddSongs>
    </div>
  </div>
</div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Queue from '@/components/Queue'
  import Collabs from '@/components/Collabs'
  import AddSongs from '@/components/AddSongs'
  export default {
    name: 'Index',
    data() {
      return {}
    },
    components: {
      Navbar,
      Queue,
      Collabs,
      AddSongs
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
    margin-top: 60px;
}
</style>
