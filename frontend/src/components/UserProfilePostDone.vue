<template>
  <div class="content">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <fab
      :main-icon="floating_btn.mainIcon"
      :actions="floating_btn.fabActions"
      :position="floating_btn.position"
      :bg-color="floating_btn.bgColor"
      @refresh="refresh"
      @addPost="addPost"
    ></fab>
    <div
      class="postFrame"
      v-for="(book, index) in responseBookJson"
      :key="index"
    >
      <bookframebtn>
        <body slot="bookImages">
          <!-- <img id="mainBookImg" src="../assets/img/book-img.png" /> -->
          <img
            v-for="(img, index) in book.Files"
            :key="index"
            v-bind:src="img.original_url"
            style="width: 195px; height: 220px; object-fit: contain"
          />
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
const HOST = "http://3.133.45.252:3000";
import bookframebtn from "./common/BookFrame_btn.vue";
import fab from "vue-fab";
export default {
  components: {
    bookframebtn,
    fab,
  },
  data() {
    return {
      responseBookJson: [],
      floating_btn: {
        mainIcon: "pending",
        bgColor: "#b68973",
        position: "bottom-right",
        fabActions: [
          {
            name: "refresh",
            icon: "cached",
          },
        ],
      },
    };
  },
  methods: {
    refresh() {
      axios.get(`${HOST}/post/list/done`).then((res) => {
        this.responseBookJson = res.data;
        console.log(this.responseBookJson);
      });
      console.log("refresh 눌림");
    },
  },
  mounted() {
    axios.get(`${HOST}/post/list/done`).then((res) => {
      this.responseBookJson = res.data;
      console.log(this.responseBookJson);
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
  margin-bottom: 100px;
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
.bookTitle > p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
