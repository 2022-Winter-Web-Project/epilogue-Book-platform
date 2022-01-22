<template>
  <header>
    <div class="header">
      <i class="fas fa-bars fa-2x" style="color: #b68973"></i>
      <h1 id="title">에필로그</h1>
      <!-- <i
        class="far fa-user fa-2x"
        style="margin-rignt: 5px; color: #b68973"
      ></i> -->
      <button class="login_btn" @click="Login()">로그인/회원가입</button>
    </div>
    <hr />
  </header>
</template>

<script>
export default {
  methods: {
    Login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/* 기본 폰트 */
@font-face {
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
}
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

/* css */
.header {
  display: flex;
}
.fas fa-bars {
  margin: 0;
  text-align: center;
}
#title {
  color: var(--color-brown);
  font-family: "tway";
  font-weight: 550;
  margin: auto;
  padding-left: 85px;
}
.far fa-user {
  margin-right: 10px;
  text-align: center;
}
.login_btn {
  border-radius: 20px;
  background: none;
  border-color: var(--color-brown);
  font-family: "elice-regular";
  font-size: var(--font-size-small);
  font-weight: bold;
  color: #1e212d;
}
</style>
