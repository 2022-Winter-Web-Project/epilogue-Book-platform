<template>
  <div class="content">
    <div
      class="postFrame"
      v-for="(book, index) in responseBookJson"
      :key="index"
    >
      <bookframebtn>
        <body slot="bookImages">
          <img id="mainBookImg" src="../assets/img/book-img.png" />
        </body>
        <body class="bookTitle" slot="bookNames">
          <p>{{ book.title }}</p>
        </body>
        <body slot="bookPrices">
          <p>{{ book.price }}원</p>
        </body>
        <body slot="bookDates">
          <p>{{ book.updatedAt.substring(0, 10) }}</p>
        </body>
      </bookframebtn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const HOST = "http://18.117.182.57:3000";
import bookframebtn from "./common/BookFrame_btn.vue";

export default {
  components: {
    bookframebtn,
  },
  data() {
    return {
      responseBookJson: [],
    };
  },
  mounted() {
    axios.get(`${HOST}/users/getBooks`).then((res) => {
      this.responseBookJson = res.data;
    });
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
.content {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 30px;
  background: #faf3e0;
}
.postFrame {
  width: 210px;
  height: 360px;
  border-radius: 20px;
  background: white;
  padding: 20px;
  margin-top: 40px;
  margin-left: 40px;
  margin-bottom: 40px;
}

#mainBookImg {
  width: 167px;
  height: 200px;
  object-fit: contain;
}
.bookTitle > p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
