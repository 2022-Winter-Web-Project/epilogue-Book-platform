<template>
  <div class="body">
    <Header></Header>
    <form class="search_form" type="submit" name="click">
      <input
        class="search_form"
        id="search_box"
        type="text"
        placeholder="책 제목, 작가, 출판사로 검색해보세요"
        v-model="keyword"
        @keyup.enter="searchresultshow(keyword)"
      />
      <i class="fas fa-search" @click="searchresultshow(keyword)"></i>
    </form>

    <!-- <div class="search_form">
      <b-form-input
        size="sm"
        class="search_form"
        type="text"
        placeholder="책 제목, 작가, 출판사로 검색해보세요"
        v-model="keyword"
        @keyup.enter="searchresultshow(keyword)"
      ></b-form-input>
      <b-button
        size="sm"
        class="my-2 my-sm-0"
        type="submit"
        @click="searchresultshow(keyword)"
      >
        <b-icon icon="fas fa-search"></b-icon>
      </b-button>
    </div> -->

    <div class="image_box">
      <img src="../assets/img/epiloguelogoimg.png" />
      <!-- <img src="../assets/img/epiloguelogoimg.png" />-->
      <div id="empty"></div>
      <img id="image_credit" src="../assets/img/epiloguecreditimg.png" />
    </div>
    <Footer></Footer>
    <go-top></go-top>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
// import Footer from "../components/Footer.vue";

import GoTop from "@inotom/vue-go-top";
// import ChildComponent from "../components/BookListSearch.vue";

export default {
  name: "ParentComponent",
  components: {
    Header: Header,
    // Footer: Footer,
    GoTop: GoTop,
    // ChildComponent,
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    submitForm: function () {},
    searchresultshow(keyword) {
      if (keyword !== "") {
        //검색어를 입력한 경우
        this.$router.push({
          path: `/search/${this.keyword}`,
          params: {
            keyword: this.keyword,
            isResultShow: true,
          },
        });
        this.keyword = "";
        console.log('"', keyword, '"' + " 검색");
      } else {
        alert("검색어를 입력해주세요!"); //검색어를 입력하지 않은 경우
      }
    },
  },
};
</script>

<style>
/* 기본 폰트 */
/* @font-face {
  font-family: "tway";
  src: url("../assets/fonts/tway_sky.ttf") format("truetype");
}
@font-face {
  font-family: "elice-bold";
  src: url("../assets/fonts/EliceDigitalBaeum_Bold.ttf") format("truetype");
}
@font-face {
  font-family: "elice-regular";
  src: url("../assets/fonts/EliceDigitalBaeum_Regular.ttf") format("truetype");
} */
:root {
  /* 기본 테마 색상 */
  --color-ivory: #faf3e0;
  --color-beige: #eabf9f;
  --color-brown: #b68973;
  --color-dark: #1e212d;
  --color-green: #9eb998;
  --color-khakii: #67917d;
  /* 폰트 사이즈 */
  --font-size-mega: 40px;
  --font-size-large: 35px;
  --font-size-medium: 25px;
  --font-size-regular: 20px;
  --font-size-small: 15px;
  --font-size-micro: 10px;
}
.body {
  /* width: 100%;
  height: 100%;
  margin: 0px; */
  overflow: scroll;
  width: auto;
  height: auto;
}
.search_form {
  text-align: center;
  background-color: var(--color-ivory);
}
#search_box {
  margin-left: 100px;
  margin-right: 5px;
  margin-top: 60px;
  width: 500px;
  height: 50px;
  border-radius: 40px;
  border: none;
  font-family: "elice-bold";
  font-size: 17px;
  box-shadow: inset 0px 4px 0px 0px rgba(0, 0, 0, 0.2);
  background: var(--color-beige);
  transition: all 0.3s ease;
  outline: none;
}
.image_box {
  margin-top: 50px;
  max-width: 100%;
  max-height: 100%;
  min-height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--color-ivory);
}

.image_box img {
  /* max-height: initial; */
  /* margin-top: -10%; */
  max-width: 100%;
  height: auto;
  display: block;
}

@media screen and (max-width: 786px) {
  .search_form {
    display: none;
  }
  #search_box {
    display: none;
  }
  .image_box img {
    display: none;
  }
}
</style>
