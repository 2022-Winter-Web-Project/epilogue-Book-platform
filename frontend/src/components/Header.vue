<template>
  <header>
    <div class="navbar">
      <div class="navbar_logo">
        <i
          class="fas fa-book-open fa-2x"
          style="color: #996f5a"
          @click="home()"
        ></i>
        <h1 id="title">에필로그</h1>
      </div>
      <!-- <i
        class="far fa-user fa-2x"
        style="margin-rignt: 5px; color: #b68973"
      ></i> -->
      <ul class="navbar_menu">
        <li>에필로그란</li>
        <li>책장</li>
        <li>FAQ</li>
        <li>Contact</li>
      </ul>
      <button class="login_btn" @click="Login()">로그인/회원가입</button>
      <a href="#" class="navbar_toggleBtn">
        <i class="fas fa-bars fa-2x" style="color: #b68973"></i>
      </a>
    </div>
  </header>
</template>

<script>
// const toggleBtn = document.querySelector(".navbar_toggleBtn");
// const menu = document.querySelector(".navbar_menu");
// const btn = document.querySelector(".login_btn");

// toggleBtn.addEventListener("click", () => {
//   menu.classList.toggle("active");
//   btn.classList.toggle("active");
// });
export default {
  methods: {
    Login() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--color-ivory);
}
.navbar_logo {
  display: flex;
  align-items: center;
}
.fas fa-bars {
  margin: 0;
  text-align: center;
}
#title {
  color: var(--color-brown);
  font-family: "tway";
  font-weight: 550;
  margin-left: 4px;
}
.navbar_menu {
  display: flex;
  justify-content: space-between;
  padding: 0;
}
.navbar_menu li {
  list-style: none;
  padding: 8px 20px;
  font-family: "elice-bold";
  font-size: var(--font-size-regular);
}
.navbar_menu li:hover {
  color: var(--color-beige);
  background-color: var(--color-brown);
  border-radius: 30px;
  cursor: pointer;
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

.navbar_toggleBtn {
  display: none;
  position: absolute;
  right: 32px;
  top: 25px;
  background-color: var(--color-ivory);
}

@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar_menu {
    /* display: none; */
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .navbar_menu li {
    width: 100%;
    text-align: center;
  }
  .navbar_menu li:hover {
    background-color: var(--color-ivory);
  }
  .login_btn {
    /* display: none; */
    justify-content: center;
    width: 100%;
  }
  .navbar_toggleBtn {
    display: block;
  }
  .navbar_menu.active,
  .login_btn.active {
    display: flex;
  }
}
</style>
