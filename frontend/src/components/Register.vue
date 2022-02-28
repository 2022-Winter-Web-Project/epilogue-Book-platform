<template>
  <div>
    <div>
      <div id="registerAll">
        <div id="registerTitle">
          <p >회원가입</p>
        </div>
        <form action="">
          <!-- 해야할 것: 중복확인 구현, true되어야 넘어가는 거-->
          <div class="lines">
            <!--중복확인을 누르지 않으면 다음 인풋으로 넘어가지 못하고, 빨간색으로 인풋이 바뀜.-->
            <!--중복확인을 누르면 모달 창이 뜨면서 true로 바뀌고, 다음 창을 입력할수있게 함. 초록색으로 바꾸는 것도 좋을듯.-->
            <input id="registerIDInput" v-model="signup.id" type="email" maxlength="20" placeholder="아이디를 입력하세요">
            <button class="Btn" v-on:click="showModal = true; checkIfTheSame();">중복확인</button>
          </div>
          
          <div class="lines">
            <input class="passwordInput" type="password" v-model="signup.password1" placeholder="비밀번호를 입력하세요">
          </div>
          <div class="lines">
            <input class="passwordInput" type="password" v-model="signup.password2" placeholder="비밀번호 확인" @blur="passwordJudgement">
            <!--blur 어노테이션으로 이벤트 실행! ==> method의 passwordJudgement() 실행-->
            <div class=notices>
              <div class="notice" v-if="!passwordJudgementTry">비밀번호를 입력해주세요</div>
              <div class="notice" v-else-if="!passwordCheck">비밀번호가 일치하지 않습니다</div>
              <div class="notice" v-else>비밀번호가 일치합니다</div>
            </div>
          </div>
            
          <div class="lines">
            <input id="registerPhone" v-model="signup.contact" type="text" maxlength="11">
            <button class="Btn" v-on:click="showCheckPhModal = true; sendSMS();">휴대전화 인증</button>
          </div>
          <div class="lines" v-if="showVerify">
            <input id="registerPhone" v-model="verifyCode" type="text" maxlength="6">
            <button class="Btn" v-on:click='showCheckVerifyModal = true; verifyCodeCheck();'>인증번호 확인</button>
          </div>
          <p id="registerConfirm" v-on:click="registerSubmit">회원가입하기</p>
        </form>
      </div>
      <modal v-if="showModal" v-on:close="showModal = false && emailSubmit">
        <h2 slot="header">{{checkDuplicateEmail}}</h2>
        <button slot="footer" v-on:click='showModal = false'>ok</button>
      </modal>
      <modal v-if="showCheckPhModal" v-on:close="showCheckPhModal = false">
        <h2 slot="header">{{ smsBtnMessage }}</h2>
        <button slot="footer" v-on:click='showCheckPhModal = false'>ok</button>
      </modal>
      <modal v-if="showCheckVerifyModal" v-on:close="showCheckVerifyModal = false">
        <h2 slot="header">{{ verifyMessage }}</h2>
        <button slot="footer" v-on:click='showCheckVerifyModal = false'>ok</button>
      </modal>
    </div>
  </div>
</template>

<script>
import Modal from './common/Modal.vue';
import axios from 'axios';
const HOST = "http://3.133.45.252:3000";

export default {
  components: {
    Modal,
  },
    data: function () { 
      return { 
        signup: { 
          id: null, 
          password1: null,
          password2: null,
          contact: null,
          // passwordFinal: passwordJudgement(), -> 여기는 v-model에서 input data를 가져오는 부분이므로 함수 호출은 불가
        },
        passwordJudgementTry: false,
        passwordCheck: true, // 비밀번호 대조 결과에 대한 변수를 만들고 이것으로 결과 여부를 확인하면 된다.
        showModal: false,
        showCheckPhModal: false,
        showCheckVerifyModal: false,
        checkDuplicateEmail: null,
        verifyCode: "",
        showVerify: false,
        checkVerify: false,
        smsBtnMessage: "전화번호를 입력해주세요.",
        verifyMessage: null,
        };
    },
  methods: {
    checkInput() {
      if (!this.signup.id) {
        this.err_message = "이메일을 입력해주세요.";
        return false;
      } else if (!this.signup.password1) {
        this.err_message = "비밀번호를 입력해주세요.";
        return false;
      } else if (!this.signup.password2) {
        this.err_message = "비밀번호 확인을 입력해주세요.";
        return false;
      } else if (!this.signup.contact) {
        this.err_message = "전화번호를 입력해주세요.";
        return false;
      }
    },
    checkIfTheSame() {
      if (!this.signup.id) {
        this.err_message = "이메일을 입력해주세요.";
        alert(this.err_message);
      } else {
        const formData = new FormData();
        formData.append("email", this.signup.id);
        console.log(this.signup.id);
        try {
          axios.post(`${HOST}/auth/checkDuplicateEmail`, formData).then((res) => {
            if (res.status == 200) {
              if (res.data.ok == true) {
                this.checkDuplicateEmail = res.data.data.message;
              } else if (res.data.ok == false) {
                this.checkDuplicateEmail = res.data.data.message;
              }
              console.log(res.data);
              console.log(res.data.data.message);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    },

    passwordJudgement() {
      this.passwordJudgementTry = true
      if (this.signup.password1 === this.signup.password2){
        console.log("true")
        this.passwordCheck = true // 비밀번호 대조 결과에 대한 변수
        // return true; -> 함수가 이벤트 호출로 실행되므로 위의 passwordFinal: passwordJudgement() 부분처럼 return값으로 결과를 받게 되면
        //                  중복호출되어 duplication error가 발생한다. 따라서 별도의 변수를 만들어 해당 변수의 값을 바꾸는 것이 좋다.
      }
      else{
        this.passwordCheck = false
        // return false;
      }
    },
    registerSubmit() {
      if (this.checkInput() === false) {
        alert(this.err_message);
      } else {
        try {
          axios
            .post("http://18.117.182.57:3000/auth/joinMember", {
            // body: {
            //   email: this.login.userEmail,
            //   password: this.login.userPassword,
            // },
            email: this.signup.id,
            password: this.signup.password1,
            contact: this.signup.contact,
            })
            .then((res) => {
            if (res.status === 200) {
              // console.log(this.$cookies.get("connect.sid"));
            //   console.log(this.cookies.keys().join("\n"));
                console.log("회원가입 성공!");
                this.clearInput();
            }
            });
        } catch (error) {
            console.log(error);
        }
      }
    },
    emailSubmit(){
      try{
        axios
        .post("http://18.117.182.57:3000/auth/sendSMS", {
          contact: this.signup.contact,
        })
        .then((res) => {
          if (res.ok === true){
            console.log(res.data.message);
          }
        });
      }catch (error) {
      console.log(error);
     }
    },
    sendSMS() {
      if (!this.signup.contact) {
        // alert("전화번호를 입력해주세요.");
      } else {
        try {
          const formData = new FormData();
          formData.append("contact", this.signup.contact);
          axios.post(`${HOST}/auth/sendSMS`, formData).then((res) => {
            if (res.status === 200) {
              console.log(res);
              this.showVerify = true;
              this.smsBtnMessage = "인증번호가 전송되었습니다. 확인해주세요.";
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
        formData.append("contact", this.signup.contact);
        formData.append("verifyCode", this.verifyCode);
        axios.post(`${HOST}/auth/verifySMS`, formData).then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.verifyMessage = "인증성공";
            this.checkVerify = true;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  }
}


</script>

<style scoped>
/* 기본폰트 */
@font-face {
  font-family: "roboto-regular";
  src: url("../assets/fonts/Roboto-Regular.ttf") format("truetype");
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

/* CSS */

#registerAll{
    position: absolute;
    font-family: "roboto-regular";
    left: 50%;
    top: 15em;
    transform: translate(-50%, -30%);
    text-align: center;
    margin:0 0 100px 0;
}

#registerTitle{
    font-weight: bold;
    font-size: 35px;
    text-decoration: underline;
    color: #1e212d;
    margin: 40px;
}

.lines{
    margin: 20px 0;
}

#registerIDInput{
    width: 50%;
}

input{
    display: inline-block;
    border: none;
    border-bottom: solid 2px var(--color-brown);
    padding-left: 10px;
    padding-right: 60px;
    font-size: var(--font-size-small);
    
}

input:focus{
    outline: none;
}

.Btn {
    display: inline-block;
    border-radius: 20px;
    background: none;
    border-color: var(—color-brown);
    font-family: "elice-regular";
    font-size: var(—font-size-small);
    font-weight: bold;
    color: #1e212d;
}

.notices{
  text-align: center;
}

.notice{
  margin:5px 0 0 0;
  display: inline-block;
  background-color: rgb(179, 179, 179);
  color:white;
  padding: 15px 30px;
  font-weight: bold;
  width: 70%;
}

.passwordInput{
  width: 70%;
}

#registerConfirm{
    font-family: 'roboto';
    font-size: var(—font-size-large);
    color: #1e212d;
    margin:80px 10px;
    font-weight: bold;
}

#registerPhone{
    width: 43%;

}

</style>