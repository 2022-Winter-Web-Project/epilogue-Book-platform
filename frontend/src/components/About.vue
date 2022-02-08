<template>
  <div class="outer_container" style="overflow-x: hidden">
    <div class="inner_container">
      <h1>Epilogue에 오신 것을 환영합니다.</h1>
      <div class="content">
        <div class="aboutData_img frame1">
          <p id="logo">
            <img id="userImg" src="../assets/img/epilogueimg.png" />
          </p>
        </div>
        <div class="aboutData frame2">
          <div class="info2">
            <p>
              에필로그... 어떤 뜻 책의 이야기는 끝났지만 이 책의 여정은 끝나지
              않았다는 의미를 담은 에필로그.... 우리 집 책장에 잠들어있는 책의
              새로운 여행을 도와주세요 어쩌고... 힘들다.....
            </p>
          </div>
        </div>
      </div>
      <div class="content2">
        <div class="pc_text">
          <h2 class="main_h2">
            <span class="sub">Epilogue만의 Platform</span>
            <br />뭐라고 쓰지<br />
            중고책거래 플랫폼 구축
          </h2>
          <p>
            중고 거래.. 번거로움.. 품질.. 믿을 수 없음... 절판된 책은 구하기도
            힘들고.... 이런 불편함을 해결하고.. 에필로그에서 쉽게 중고 책거래를
            하세요.
          </p>
        </div>
        <div class="pc_img">
          <p id="bg">
            <img
              id="bg_img"
              src="https://epiloguekr.s3.ap-northeast-2.amazonaws.com/serverAssets/bg_system_sec 2.jpg"
            />
          </p>
        </div>
      </div>
      <div class="content3">
        <div class="aboutData frame3">
          <div class="info3">
            <h2>여기에는 사진 뭐넣지</h2>
          </div>
        </div>
        <div class="aboutData frame4">
          <div class="info4">
            <h2>여기에는 뭐 써야하지....</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// const HOST = "http://18.117.182.57:3000/";

export default {};
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
  width: 100%;
  margin-top: 50px;
  /* background: #eabf9f; */
}
.inner_container > h1 {
  display: flex;
  margin-left: 130px;
}
.content {
  display: grid;
  grid-template-columns: 600px 600px;
  grid-template-rows: 330px;
  place-content: center;
}
.aboutData {
  width: 540px;
  height: 280px;
  background: #faf3e0;
  margin: 10px 10px 10px;
  padding: 3px 20px 30px;
  text-align: left;
  border: 1px solid brown;
  border-radius: 10px;
}
.frame1 {
  grid-column: 1 / 2;
}
.frame2 {
  grid-column: 2 / 3;
  border: none;
  background: none;
}
.aboutData_img {
  width: 540px;
  height: 280px;
  background: #faf3e0;
  margin: 10px 10px 10px;
  padding: 3px 20px 30px;
}
#logo {
  margin: 0;
}
#logo > #userImg {
  width: 580px;
  height: 300px;
  object-fit: contain;
}

.content2 {
  display: grid;
  grid-template-columns: 700px 700px;
  grid-template-rows: 600px;
  place-content: center;
  margin-top: 50px;
}
.content2 > .pc_text {
  grid-column: 1;
  margin-left: 110px;
  text-align: left;
  margin-top: 80px;
}
.content2 > .pc_img {
  grid-column: 2;
}
.pc_text > .main_h2 {
  font-size: 50px;
}
.pc_text > .main_h2 > .sub {
  font-size: 30px;
  color: #555;
}
.pc_text > p {
  font-size: 17px;
  color: #555;
}
.pc_img > #bg > #bg_img {
  width: 800px;
  height: 570px;
  object-fit: contain;
}

.content3 {
  display: grid;
  grid-template-columns: 600px 600px;
  grid-template-rows: 330px 330px;
  place-content: center;
  margin-top: 50px;
}
.frame3 {
  grid-column: 1 / 2;
  grid-row: 1;
}
.frame4 {
  grid-column: 2 / 3;
  grid-row: 1;
}
.info3 {
  display: grid;
  grid-template-columns: 100px 300px;
}
.info3 > h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}

.info4 {
  display: grid;
  grid-template-columns: 100px 300px;
}
.info4 > h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}
</style>
