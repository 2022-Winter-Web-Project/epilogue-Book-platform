// <script>
//     function inputPhoneNumber(obj) {
//     var number = obj.value.replace(/[^0-9]/g, "");
//     var phone = "";

//     if(number.length < 4) {
//         return number;
//     } else if(number.length < 7) {
//         phone += number.substr(0, 3);
//         phone += "-";
//         phone += number.substr(3);
//     } else if(number.length < 11) {
//         phone += number.substr(0, 3);
//         phone += "-";
//         phone += number.substr(3, 3);
//         phone += "-";
//         phone += number.substr(6);
//     } else {
//         phone += number.substr(0, 3);
//         phone += "-";
//         phone += number.substr(3, 4);
//         phone += "-";
//         phone += number.substr(7);
//     }
//     obj.value = phone;
// }
//     </script>
<template>
  <div>
    <div>
      <div id="all">
        <div >
          <p id="titleRegister">회원가입</p>
        </div>
        <!-- 문제점: 회원가입에 css가 안먹는다 -->
        <!-- 해야할 것: 중복확인 구현, true되어야 넘어가는 거, 휴대전화 인증연결,
                    아이디 비밀번호 저장-->
        <div class="lines">
          <!--중복확인을 누르지 않으면 다음 인풋으로 넘어가지 못하고, 빨간색으로 인풋이 바뀜.-->
          <!--중복확인을 누르면 모달 창이 뜨면서 true로 바뀌고, 다음 창을 입력할수있게 함. 초록색으로 바꾸는 것도 좋을듯.-->
          <input id="register-idInput" v-model="signup.id" type="text" maxlength="20" placeholder="아이디/이메일을 입력하세용!">
          <button class="Btn" v-click='showModal = true'>중복확인</button>
        </div>
        
        <div class="lines">
          <input type="password" v-model="signup.password1" placeholder="비밀번호를 입력하세요">
        </div>
        <div class="lines">
          <input type="password" v-model="signup.password2" placeholder="비밀번호 확인">
        </div>
        <div class="lines">
          <input type="text" onKeyup="inputPhoneNumber(this);" maxlength="13">
          <button class="Btn" v-click='showCheckPhModal = true'>휴대전화 인증</button>
        </div>
        <p>회원가입하기</p>
      </div>
      <modal v-if="showModal" @close="showModal = false">
        <h2 slot="header">사용가능한 아이디입니다</h2>
      </modal>
      
    </div>
  </div>
  
</template>

<script>
import Modal from './common/Modal.vue'

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
          passwordFinal: passwordJudgement(),
        },
        showModal: false
        };
    },
  methods: {
    passwordJudgement() {
      if (signup.password1==signup.password2){
        console.log("true")
        return true;
      }
      else{
        return false;
      }
    }
  }
}


</script>

<style scoped>
@font-face {
  font-family: "roboto";
  src: url("../assets/fonts/Roboto-Regular.ttf")  format("truetype");
}
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

*{
  font-family: roboto;
}

.lines{
  text-align: center;
}

#all{
  position: absolute;
  left: 50%;
  top: 15em;
  transform: translate(-50%, -30%);
  text-align: center;
  margin: 0 auto;
}

.titleRegister{
  font-family: 'Roboto-Regular';
  font-size: var(--font-size-large);
  text-decoration: underline;
  color: #1e212d;
  margin: 70px;
}

#Btn {
  border-radius: 20px;
  background: none;
  border-color: var(--color-brown);
  font-family: "elice-regular";
  font-size: var(--font-size-small);
  font-weight: bold;
  color: #1e212d;
}
</style>