<template>
  <div class="content">
    <div class="postFrame">
      <div class="bookImage_box">
        <img id="mainBookImg" src="../assets/img/book-img.png" />
      </div>
      <div class="textArea">
        <div class="bookName">
          <p style="margin: 0px">자바 ORM 표준 JPA 프로그래밍</p>
        </div>
        <div class="price"><p>43,000원</p></div>
        <div class="date"><p>2022-02-03</p></div>
        <div class="btnArea">
          <button
            class="w-btn-outline w-btn-skin-outline"
            type="button"
            @click="modifyPost"
          >
            수정하기
          </button>
          <button class="w-btn-outline w-btn-skin-outline" type="button">
            판매완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// const HOST = "http://18.117.182.57:3000/";

export default {
  data() {
    return {
      title: null,
      author: null,
      publisher: null,
      price: null,
      description: null,
      images: null,
      conditionValue: [],
    };
  },
  methods: {
    modifyPost() {
      this.$router.push("/postUpload");
      // let image = this.$refs["image"].files[0];
      // const header = { "Content-Type": "multipart/form-data" };
      // const formData = {
      //   title: this.title,
      //   author: this.author,
      //   publisher: this.publisher,
      //   price: this.price,
      //   condition: this.conditionValue,
      //   description: this.description,
      //   images: image,
      // };

      // try {
      //   axios
      //     .post(HOST + "post/upload/s3", formData, { header })
      //     .then((res) => {
      //       if (res.status === 200) {
      //         console.log("게시물 업로드 성공!");
      //         console.log(res);
      //       }
      //     });
      // } catch (error) {
      //   console.log(error);
      // }
    },
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
  display: grid;
  place-content: center;
  /* background: chartreuse; */
}
.postFrame {
  width: 210px;
  height: 360px;
  border-radius: 20px;
  background: #faf3e0;
  padding: 20px;
}
.bookImage_box {
  text-align: center;
  background-color: skyblue;
}
#mainBookImg {
  width: 167px;
  height: 250px;
  object-fit: contain;
}
.textArea {
  display: grid;
  grid-template-columns: 80px 130px;
  font-family: "elice-regular";
  margin: 0;
}
.bookName {
  text-align: left;
  font-size: 16px;
  grid-column: 1 / 3;
  grid-row: 1;
}
.price {
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  grid-column: 1;
  grid-row: 2;
}
.date {
  text-align: left;
  font-size: 10px;
  font-weight: bold;
  color: gray;
  grid-column: 1;
  grid-row: 3;
}
.btnArea {
  grid-column: 2;
  grid-row: 3;
}
.btnArea > .w-btn-outline:nth-child(1) {
  margin-right: 10px;
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
