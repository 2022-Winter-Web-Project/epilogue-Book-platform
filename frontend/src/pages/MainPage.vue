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
    <div class="image_box"><img class="img" /></div>
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
}
#search_box {
  margin-right: 5px;
  margin-top: 130px;
  width: 500px;
  height: 50px;
  border-radius: 40px;
  border: none;
  font-family: "elice-bold";
  font-size: 17px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  background: var(--color-ivory);
  transition: all 0.3s ease;
  outline: none;
}
.image_box {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/epiloguemainimg.png");
}
</style>
