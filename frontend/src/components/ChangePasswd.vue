<template>
  <div>
    <div id="Container">
      <h1 id="titleContainer">비밀번호 변경</h1>
      <div id="formSection">
        <form method="post">
          <input
            size="35"
            type="password"
            name="newPassword"
            placeholder="새 비밀번호"
            v-model="newPassword"
          />
          <input
            size="35"
            type="password"
            name="newPasswordCheck"
            placeholder="비밀번호 확인"
            v-model="newPasswordCheck"
          />
        </form>
      </div>
      <div id="verifySection">
        <div id="section1">
          <form>
            <input
              size="24"
              type="text"
              placeholder="(-) 없이 입력"
              v-model="phoneNumber"
            />
          </form>
          <button class="smsBtn" v-on:click="sendSMS">
            인증번호<br />전송
          </button>
        </div>
        <div id="section2" v-if="showVerify">
          <input
            size="24"
            type="text"
            placeholder="인증번호 확인"
            v-model="verifyCode"
          />
          <button class="smsBtn" v-on:click="verifyCodeCheck">
            인증번호<br />확인
          </button>
        </div>
      </div>

      <div id="btn">
        <button class="menuBtn" v-on:click="changePw">확인</button>
        <button class="menuBtn" v-on:click="cancel">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
// import Modal from "./common/Modal.vue";
import axios from "axios";
const HOST = "http://3.133.45.252:3000";

export default {
  components: {
    // Modal,
  },
  data() {
    return {
      newPassword: "",
      newPasswordCheck: "",
      err_message: "새 비밀번호를 입력해주세요.",
      phoneNumber: "",
      verifyCode: "",
      showVerify: false,
      checkVerify: false,
      showModal1: false,
      showModal2: false,
    };
  },
  methods: {
    checkInput() {
      if (!this.newPassword) {
        this.err_message = "새 비밀번호를 입력해주세요.";
        return false;
      } else if (!this.newPasswordCheck) {
        this.err_message = "비밀번호 확인을 입력해주세요.";
        return false;
      }
    },
    checkPassword() {
      if (this.newPassword != this.newPasswordCheck) {
        this.err_message = "입력한 비밀번호가 서로 일치하지 않습니다.";
        return false;
      }
    },
    sendSMS() {
      if (!this.phoneNumber) {
        alert("전화번호를 입력해주세요.");
      } else {
        try {
          const formData = new FormData();
          formData.append("contact", this.phoneNumber);
          axios.post(`${HOST}/auth/sendSMS`, formData).then((res) => {
            if (res.status === 200) {
              console.log(res);
              alert("인증번호가 전송되었습니다.확인해주세요.");
              this.showVerify = true;
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    verifyCodeCheck() {
      try {
        const formData = new FormData();
        formData.append("contact", this.phoneNumber);
        formData.append("verifyCode", this.verifyCode);
        axios.post(`${HOST}/auth/verifySMS`, formData).then((res) => {
          if (res.status === 200) {
            console.log(res);
            alert("인증 성공!");
            this.checkVerify = true;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    changePw() {
      if (this.checkInput() === false) {
        alert(this.err_message);
      } else if (this.checkPassword() === false) {
        alert(this.err_message);
      } else if (this.checkVerify === false) {
        alert("먼저 인증을 완료해주세요.");
      } else {
        const formData = new FormData();
        formData.append("newPassword", this.newPassword);

        try {
          axios.post(`${HOST}/help/resetPW`, formData).then((res) => {
            if (res.status === 200) {
              console.log("비밀번호 변경 성공!");
              console.log(res);
              try {
                axios.get(`${HOST}/auth/logout`, {}).then((res) => {
                  if (res.status === 200) {
                    this.$router.push("/");
                    alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
                  }
                });
              } catch (error) {
                console.log(error);
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    cancel() {
      this.$router.push("/userProfile");
    },
  },
};
</script>

<style scoped>
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

/* CSS */
#Container {
  position: flex;
  justify-content: center;
  align-items: center;
}
#titleContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto-Regular";
  font-size: var(--font-size-large);
  text-decoration: underline;
  color: #1e212d;
  margin: 70px;
}
#formSection {
  display: flex;
  justify-content: center;
  align-items: center;
}
#verifySection > #section1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
#verifySection > #section2 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.smsBtn {
  background: #faf3e0;
  width: 80px;
  height: 40px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
}
.smsBtn:hover {
  font-weight: bold;
  cursor: pointer;
}

input {
  display: block;
  border: none;
  border-bottom: solid 2px var(--color-brown);
  padding-left: 10px;
  padding-right: 10px;
  margin: 30px 0;
  font-size: var(--font-size-small);
}
input:focus {
  outline: none;
}

#btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* button:nth-child(2) {
  background: lightgray;
} */
.menuBtn:hover {
  font-weight: bold;
  cursor: pointer;
}
.menuBtn {
  margin-top: 15px;
  background: #faf3e0;
  width: 288px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
}
</style>
