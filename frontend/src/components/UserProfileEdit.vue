<template>
  <div class="content">
    <div class="profileFrame frame1">
      <div class="info1">
        <h2>프로필 및 연동 계정</h2>
        <p id="logo">
          <img
            id="userImg"
            src="https://epiloguekr.s3.ap-northeast-2.amazonaws.com/serverAssets/chara-05.png"
          />
        </p>
        <div id="nickGroup">
          <p id="nick">닉네임</p>
          <p id="nickData">시로모</p>
        </div>
        <input
          ref="image"
          id="upload_image"
          type="file"
          name="images"
          accept="image/*"
          multiple="multiple"
          class="editBtn"
          @change="uploadImage()"
        />
        <button class="editBtn" type="button">
          <label for="upload_image">프로필 사진 변경</label>
        </button>
      </div>
    </div>
    <div class="profileFrame frame2">
      <div class="info2">
        <h2>이메일 및 연락처</h2>
        <p id="email">이메일</p>
        <p id="emailData">{{ responseUserJson.email }}</p>
        <p id="contact">연락처</p>
        <p id="contactData">+82 {{ responseUserJson.contact }}</p>
        <button class="editBtn" type="button">연락처 변경하기</button>
      </div>
    </div>
    <div class="profileFrame frame3">
      <div class="info3">
        <h2>비밀번호</h2>
        <p id="password">비밀번호</p>
        <p id="editContact">변경하기</p>
      </div>
    </div>
    <div class="profileFrame frame4">
      <div class="info4">
        <h2>SNS 연동</h2>
        <p id="platform_kakao">카카오</p>
        <p id="platformData_kakao">연동하기</p>
        <p id="platform_naver">네이버</p>
        <p id="platformData_naver">연동하기</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const HOST = "http://3.143.242.75:3000";

export default {
  data() {
    return {
      responseUserJson: [],
    };
  },
  mounted() {
    axios.get(`${HOST}/users/read`).then((res) => {
      this.responseUserJson = res.data;
      console.log(this.responseUserJson);
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
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 460px 460px;
  grid-template-rows: 260px 260px;
  margin: 50px;
}
.profileFrame {
  width: 400px;
  height: 200px;
  background: #faf3e0;
  margin: 16px 8px 0;
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
}
.frame3 {
  grid-column: 1;
  grid-row: 2;
}
.frame4 {
  grid-column: 2;
  grid-row: 2;
}

.info1 {
  display: grid;
  grid-template-columns: 100px 300px;
}
.info1 > h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}
.info1 > #logo {
  margin: 0;
  grid-column: 1 / 2;
  grid-row: 2;
}
.info1 > #logo > #userImg {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 16px;
  margin-bottom: 16px;
}
.info1 > #nickGroup {
  display: flex;
  justify-content: center;
}
.info1 > #nickGroup > #nick {
  grid-column: 2 / 3;
  grid-row: 2;
  font-weight: bold;
  margin-right: 60px;
}
.info1 > #nickGroup > #nickData {
  grid-column: 2 / 3;
  grid-row: 2;
}
.info1 > #upload_image {
  grid-column: 2;
  grid-row: 3;
  display: none;
}

.info2 {
  display: grid;
  grid-template-columns: 100px 300px;
}
.info2 > h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}
.info2 > #email {
  grid-column: 1;
  grid-row: 2;
  font-weight: bold;
}
.info2 > #emailData {
  grid-column: 2;
  grid-row: 2;
}
.info2 > #contact {
  grid-column: 1;
  grid-row: 3;
  font-weight: bold;
}
.info2 > #contactData {
  grid-column: 2;
  grid-row: 3;
}
.info2 > button {
  grid-column: 1;
  grid-row: 4;
}

.info3 {
  display: grid;
  grid-template-columns: 100px 300px;
}
.info3 > h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}
.info3 > #password {
  grid-column: 1;
  grid-row: 2;
  font-weight: bold;
}
.info3 > #editContact {
  color: #24a2f6;
  font-weight: bold;
  grid-column: 2;
  grid-row: 2;
}

.info4 {
  display: grid;
  grid-template-columns: 100px 300px;
}
.info4 > h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}
.info4 > #platform_kakao {
  grid-column: 1 / 2;
  grid-row: 2;
  font-weight: bold;
}
.info4 > #platformData_kakao {
  grid-column: 2 / 3;
  grid-row: 2;
  font-weight: bold;
  color: #24a2f6;
}
.info4 > #platform_naver {
  grid-column: 1 / 2;
  grid-row: 3;
  font-weight: bold;
}
.info4 > #platformData_naver {
  grid-column: 2 / 3;
  grid-row: 3;
  font-weight: bold;
  color: #24a2f6;
}

.editBtn {
  background: #faf3e0;
  width: 120px;
  height: 30px;
  border: 2px solid brown;
  border-radius: 5px;
}

.editBtn:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>
