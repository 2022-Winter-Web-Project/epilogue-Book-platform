<template>
  <div id="app">
    <login-page></login-page>
  </div>
</template>

<script>
import Login from "./components/login.vue";

export default {
  components: {
    'login-page':Login
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
