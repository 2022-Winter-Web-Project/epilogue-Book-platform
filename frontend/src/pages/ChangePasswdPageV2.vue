<template>
  <div>
    <Header></Header>
    <ChangePasswd></ChangePasswd>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import ChangePasswd_v2 from "../components/ChangePasswd_v2.vue";

export default {
  components: {
    Header: Header,
    ChangePasswd: ChangePasswd_v2,
  },
};
</script>

<style></style>
