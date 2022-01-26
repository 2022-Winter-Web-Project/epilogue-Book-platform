<template>
  <div class="body">
    <Header></Header>
    <form class="search_form" type="submit" name="click">
      <input
        id="search_box"
        type="text"
        placeholder="책 제목, 작가, 출판사로 검색해보세요"
      />
      <i class="fas fa-search"></i>
    </form>
    <div class="image_box">
      <img src="../assets/img/epiloguemainimg.png" />
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Header from "../components/Header.vue";
// import Footer from "../components/Footer.vue";

export default {
  components: {
    Header: Header,
    // Footer: Footer,
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
  width: 100%;
  height: 100%;
}
.search_form {
  text-align: center;
  background-color: var(--color-ivory);
}
#search_box {
  margin-left: 100px;
  margin-right: 5px;
  margin-top: 110px;
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
  /* margin-top: 50px; */
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.image_box img {
  max-height: initial;
  margin-top: -10%;
}
@media screen and (max-width: 786px) {
  .search_form {
    display: none;
  }
  #search_box {
    display: none;
  }
}
</style>
