<template>
  <div class="container">
    <Header></Header>
    <div>
      <!-- <div class=""> -->
      <router-view></router-view>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import header from "./components/header";
export default {
  components: {
    Header: header
  },
  created() {
    this.$store.dispatch("initstocks");
  }
};
</script>
<style>
body {
  padding: 30px;
}
</style>
