<template>
  <div id="Page" style="overflow-y: scroll">
    <h3 class="name">"{{ keyword }}"으로 검색된 결과"</h3>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(book, index) in responsePosts" :key="index"
        ><bookframe>
          <body slot="bookImage">
            <img
              v-for="(img, index) in book.Files"
              :key="index"
              v-bind:src="img.original_url"
              @click="modifyPost(book.id)"
              style="width: 195px; height: 259px; object-fit: contain"
            />
          </body>
          <body slot="bookName">
            <div @click="modifyPost(book.id)">
              <p>{{ book.title }}</p>
            </div>
          </body>
          <body slot="bookPrice">
            <p>{{ book.price }} 원</p>
          </body>
          <body slot="bookDate">
            <p>{{ book.updatedAt.substring(0, 10) }}</p>
          </body>
        </bookframe></swiper-slide
      >
      <div class="swiper-scrollbar" slot="scrollbar"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import bookframe from "./common/BookFrame.vue"; // 컴포넌트 재사용을 위해 import
import axios from "axios"; // http 통신을 위한 라이브러리
const HOST = "http://3.133.45.252:3000";

export default {
  name: "BookListSearchPage",
  components: {
    Swiper,
    SwiperSlide,
    bookframe, // 컴포넌트 추가
  },
  // props: ["keyword"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        touchRatio: 0,
        loop: true,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      bookNameItem: "",
      bookPriceItem: "",
      bookDateItem: "",
      responsePosts: [],
      test: "",
      keyword: "",
    };
  },
  methods: {
    // modifyPost(postId) {
    //   console.log("전달받은 params : " + postId);
    //   this.$router.push({
    //     path: `/detail/${postId}`,
    //     params: { postId: postId },
    //   });
    // },
    // Detail() {
    //   this.$router.push("/detail");
    // },
    // Detail2() {
    //   this.$router.push("/detail2");
    // },
    // Detail3() {
    //   this.$router.push("/detail3");
    // },
  },
  mounted() {
    this.keyword = this.$route.params.keyword;
    axios.get(`${HOST}/post/search/${this.keyword}/title`).then((res) => {
      console.log(res.data);
      this.responsePosts = res.data;
    });
  },
};
</script>

<style scoped>
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
.name {
  display: grid;
  place-content: center;
  padding: 30px;
}
.swiper {
  height: 450px;
  width: 80%;
  /* background-color: burlywood; */
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: cornsilk; */
}
.container {
  padding: 10px;
}
.bookImage_box {
  display: grid;
  place-content: center;
  padding: 5px;
  /* background-color: skyblue; */
}
#mainBookImg {
  width: 167px;
  height: 200px;
  object-fit: contain;
}
.textArea {
  font-family: "elice-regular";
  float: left;
}
.bookName {
  font-size: 20px;
}
.price {
  font-size: 20px;
  font-weight: bold;
}
.date {
  font-size: 15px;
  font-weight: bold;
  color: gray;
}
</style>
