<template>
  <div class="Leave">
    <div class="container">
      <div class="boxes">
        <div class="box">
          <div class="smallBox">
            <h1 class="text">회원탈퇴</h1>
            <p class="text">
              회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.
            </p>
          </div>
        </div>

        <div class="box">
          <div class="smallBox">
            <h1 class="text">복구 불가</h1>
            <p class="text">
              사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.
              탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니
              신중하게 선택하시기 바랍니다.
            </p>
          </div>
          <div class="smallBox">
            <h1 class="text">
              탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다.
            </h1>
            <p class="text">
              회원정보 및 장터 이용 기록 등 서비스의 이용기록은 모두 삭제되며,
              삭제된 데이터는 복구되지 않습니다. <br />삭제되는 내용을
              확인하시고 필요한 데이터는 미리 백업을 해주세요.
            </p>
          </div>
        </div>

        <div>
          <p class="checkSection">
            탈퇴 후에는 같은 아이디로 다시 가입할 수 없으며 아이디와 데이터는
            복구할 수 없습니다. <br />
            장터 이용으로 인한 불가피한 잔여 이용 기록은 탈퇴 후 삭제할 수
            없습니다.
            <br />
            탈퇴 후에는 회원정보가 삭제되어 본인 여부를 확인할 수 있는 방법이
            없어, 게시글을 임의로 삭제해드릴 수 없습니다.
            <br />
            원천적으로 탈퇴한 회원님의 정보는 접근할 수 있는 방법이 없음을 다시
            한 번 말씀 드립니다.
          </p>
          <div class="radioSection">
            <input
              type="radio"
              id="radioBtn"
              v-model="radioCheck"
              value="check"
            />
            <p>안내 사항을 모두 확인하였으며, 이에 동의합니다.</p>
          </div>
          <div class="radioSection">
            <button class="menuBtn" v-on:click="leaveProcess">확인</button>
          </div>
        </div>

        <div><br /><br /><br /></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const HOST = "http://3.133.45.252:3000";

export default {
  data() {
    return {
      err_message: "",
      radioCheck: false,
    };
  },
  methods: {
    checkInput() {
      if (!this.radioCheck) {
        this.err_message = "탈퇴 안내를 확인하고 동의해 주세요.";
        return false;
      }
    },
    leaveProcess() {
      if (this.checkInput() === false) {
        alert(this.err_message);
      } else {
        try {
          axios.post(`${HOST}/auth/help/leave`).then((res) => {
            if (res.status === 200) {
              console.log(res);
              alert(
                "회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사드립니다."
              );
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
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

.Leave {
  display: flex;
  height: 700px;
  overflow: auto;
}
.container {
  display: inline-block;
  width: 1300px;
  margin: 0 auto;
}
.boxes {
  margin: 40px;
}
.box {
  background-color: #faf3e0;
  margin: 10px;
  padding: 10px;
  font-family: "elice-regular";
}
.smallBox {
  display: flex;
  flex-direction: column;
  background-color: #b68973;
  padding: 10px;
  margin: 10px;
}
.text {
  display: inline;
  margin: 5px;
  color: white;
}
.checkSection {
  margin-top: 30px;
  margin-left: 20px;
  color: orange;
}
.radioSection {
  display: flex;
  justify-content: center;
  align-items: center;
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
.menuBtn:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>
