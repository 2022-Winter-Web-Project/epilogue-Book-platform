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
      <p>회원가입</p>
      <div>
        <input type="text" placeholder="아이디/이메일을 입력하세요">
        <button>중복확인</button>
        <input type="text" placeholder="비밀번호를 입력하세요">
        <input type="text" placeholder="비밀번호 확인">
        <input type="text" onKeyup="inputPhoneNumber(this);" maxlength="13">
        <button>휴대전화 인증</button>
      </div>
      <p>회원가입하기</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>