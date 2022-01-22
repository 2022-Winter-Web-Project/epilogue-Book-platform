<template>
  <div>
    <Header></Header>
    <div class="content">
      <input
        id="search_box"
        type="text"
        placeholder="책 제목, 작가, 출판사로 검색해보세요"
      />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header: Header,
  },
};
</script>

<style>
.content {
  text-align: center;
}
#search_box {
  margin-top: 130px;
  width: 500px;
  height: 50px;
  border-radius: 40px;
  border: 1px solid gray;
}
</style>
