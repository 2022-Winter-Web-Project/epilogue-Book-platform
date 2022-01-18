<template>
  <div id="app">
    <loginPage></loginPage>
    <Header></Header>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Login from "./components/login.vue";

export default {
  components: {
    'loginPage':Login
    'Header': Header,
  }

};
</script>

<style></style>
