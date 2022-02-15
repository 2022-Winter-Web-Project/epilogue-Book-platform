<template>
  <div class="outer_container">
    <div class="inner_container">
      <div class="container">
        <div class="nav">
          <h2>마이페이지</h2>
          <hr />
          <button class="menuBtn" v-on:click="currentComponent = 'posts'">
            판매중
          </button>
          <button class="menuBtn" v-on:click="currentComponent = 'edit'">
            개인정보 수정
          </button>
        </div>
        <component v-bind:is="changeComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfilePost from "../components/UserProfilePost.vue";
import UserProfileEdit from "../components/UserProfileEdit.vue";

export default {
  data() {
    return {
      currentComponent: "posts",
    };
  },
  computed: {
    changeComponent() {
      console.log(this.currentComponent);
      return this.currentComponent;
    },
  },
  components: {
    posts: UserProfilePost,
    edit: UserProfileEdit,
  },
};
</script>

<style scoped>
/* 기본 폰트 */
@font-face {
  font-family: "Roboto-Regular";
  src: url("../assets/fonts/Roboto-Regular.ttf") format("truetype");
  font-weight: 400;
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
.outer_container {
  height: 700px;
  overflow: auto;
  text-align: center;
}
.inner_container {
  display: inline-block;
  width: 1300px;
  /* background: #eabf9f; */
}
.container {
  display: grid;
  grid-template-columns: 250px 1050px;
}

.nav {
  width: 250px;
  height: 700px;
  margin-top: 70px;
  text-align: center;
  font-family: "elice-regular";
}
.nav > h2 {
  width: 120px;
  height: 50px;
  margin: auto;
  border-bottom: solid 2px var(--color-brown);
}
.nav > hr {
  display: none;
  width: 130px;
  height: 1px;
  color: brown;
  background: brown;
}
.nav > button {
  background: #faf3e0;
  width: 130px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
}
.menuBtn:hover {
  font-weight: bold;
  cursor: pointer;
}
.menuBtn {
  margin-top: 15px;
}

.w-btn-outline {
  position: relative;
  padding: 1px;
  border-radius: 15px;
  font-family: "Roboto-Regular";
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 500;
  transition: 0.25s;
  grid-column: 1;
  grid-row: 3;
}

.w-btn-skin-outline {
  border: 3px solid #f8e6e0;
  color: #6e6e6e;
}
.w-btn-skin-outline:hover {
  background-color: #f8e6e0;
  color: #6e6e6e;
}
.w-btn-outline:hover {
  letter-spacing: 2px;
  transform: scale(1);
  cursor: pointer;
}
.w-btn-outline:active {
  transform: scale(1.5);
}
</style>
