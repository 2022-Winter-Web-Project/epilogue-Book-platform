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
        <p>회원가입</p>
        <div class="blocks">
          <!--중복확인을 누르지 않으면 다음 인풋으로 넘어가지 못하고, 빨간색으로 인풋이 바뀜.-->
          <!--중복확인을 누르면 모달 창이 뜨면서 true로 바뀌고, 다음 창을 입력할수있게 함. 초록색으로 바꾸는 것도 좋을듯.-->
          <input id=register-idInput v-model="signup.id" type="text" maxlength="20" placeholder="아이디/이메일을 입력하세용!">
          <button class="Btn" @click='showModal = true'>중복확인</button>
          
        </div>
        
        <div class="blocks">
          <input type="text" placeholder="비밀번호를 입력하세요">
          <input type="text" placeholder="비밀번호 확인">
        </div>
        <div class="blocks">
          <input type="text" onKeyup="inputPhoneNumber(this);" maxlength="13">
          <button class="Btn" @click='showCheckPhModal = true'>휴대전화 인증</button>
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
          password: null, 
          pwhint: '', 
          pwhintans: null 
          },
        showModal: false
        };
    }
}

</script>

<style scoped>
@font-face {
  font-family: "roboto";
  src: url("../assets/fonts/Roboto-Regular.ttf")  format("truetype");
}

* {
  font-family: roboto;
}

.blocks{
  display:block;
  
}

#all{
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
}

p{
  display:flex;
  align-content: center;
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