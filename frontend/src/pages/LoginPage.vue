<template>
  <div>
    <Header></Header>
    <Login></Login>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Login from "../components/Login.vue";

export default {
  components: {
    Login: Login,
    Header: Header,
  },
};
</script>

<style></style>
