<template>
  <div id="Page" style="overflow-y: scroll">
    <h3 class="name">"프로그래밍으로 검색된 결과"</h3>
    <swiper class="swiper" :options="swiperOption">
      <!-- 게시물 목록 데이터 (responseBookJson)의 게시물 개수에 따라 슬라이드 생성 (반복문) -->
      <swiper-slide v-for="(book, index) in responseBookJson" :key="index">
        <book-frame>
          <body slot="bookImage">
            <img src="../assets/img/book-img.png" />
          </body>
          <body slot="bookName">
            <!-- BookFrame.vue에서 <slot name="bookName"> 의 하위 내용이 <p>{{ bookNameItem }}</p> 으로 치환된다. -->
            <!-- <p>{{ bookNameItem }}</p> -->
            <!-- bookNameItem 변수에 있는 값이 이곳에 표시된다. -->
            <!-- bookNameItem: {{ bookNameItem }} 으로 하는 것이 맞지만 이름이 같으므로 {{ bookNameItem }} 이렇게 해도 무방하다. -->

            <!-- 반복문 내의 게시물 데이터 -->
            <p>{{ book.title }}</p>
          </body>
          <body slot="bookPrice">
            <!-- BookFrame.vue에서 <slot name="bookPrice"> 의 하위 내용이 <p>{{ bookPriceItem }}</p> 으로 치환된다. -->
            <!-- <p>{{ bookPriceItem }}</p> -->
            <!-- bookPriceItem 변수에 있는 값이 이곳에 표시된다. -->

            <p>{{ book.price }}</p>
          </body>
          <body slot="bookDate">
            <!-- BookFrame.vue에서 <slot name="bookDate"> 의 하위 내용이 <p>{{ bookDateItem }}</p> 으로 치환된다. -->
            <!-- <p>{{ bookDateItem }}</p> -->
            <!-- bookDateItem 변수에 있는 값이 이곳에 표시된다. -->

            <p>{{ book.updatedAt }}</p>
          </body>
        </book-frame>
      </swiper-slide>
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
import BookFrame from "./common/BookFrame.vue"; // 컴포넌트 재사용을 위해 import
import axios from "axios"; // http 통신을 위한 라이브러리
const HOST = "http://18.117.182.57:3000"; // AWS 배포 주소

export default {
  components: {
    Swiper,
    SwiperSlide,
    BookFrame, // 컴포넌트 추가
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
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
      responseBookJson: [], // 게시물 목록 데이터,
    };
  },
  methods: {
    Detail() {
      this.$router.push("/detail");
    },
    Detail2() {
      this.$router.push("/detail2");
    },
    Detail3() {
      this.$router.push("/detail3");
    },
  },
  mounted() {
    // mounted는 페이지가 로딩될 때마다 실행되는데 페이지를가 로딩될 때마다 게시물을 불러와야하므로 mounted()에 axios를 적어준다.
    // 모든 게시물을 불러오는 주소가 http://18.117.182.57:3000/post/list 이므로 이것을 적어준다.
    // 또 서버에서 GET 통신을 해야하므로 axios.get 으로 적어준다.
    // ${}는 백틱(`)안에서 변수의 값을 가져올 때 유용하다. 물론 이렇게 하지 않고 HOST + "/post/list" 로 표현해도 된다.
    axios.get(`${HOST}/post/list`).then((res) => {
      const { data } = res; // 통신 이후에 받아온 응답 res 를 data 에 담아두면 [{...}] 형태, 즉, json을 배열로 감싼 결과가 들어온다.
      console.log(data); // [ { id: 1, title: 명품자바프로그래밍, ~~ }, { id: 2, title: 열혈C프로그래밍, ~~ } ] 의 형태임을 알 수 있다.
      // 물론 하나의 게시물만을 불러올 때는 위와 같이 배열의 형태가 아닌 json 의 형태로만 들어올 것이기 때문에 => { id: 1, title: 명품자바프로그래밍, ~~ }
      // 배열을 신경쓸 필요는 없다.
      console.log(data[0]); // 배열에서 첫번째 데이터를 가져온다.
      console.log(data[0].id); // 첫번째 데이터 중 id를 가져온다.
      console.log(data[0].description); // 첫번째 데이터 중 description을 가져온다.
      this.bookNameItem = data[0].title; // 위 data()에서 bookNameItem에 제목을 넣어준다.
      this.bookPriceItem = data[0].price;
      this.bookDateItem = data[0].updatedAt;

      // 게시물 목록 데이터
      this.responseBookJson = res.data;
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
