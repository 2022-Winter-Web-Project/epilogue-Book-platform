<template>
    <div id="loginPage">
        <h1 id="titleLoginpage">로그인</h1>
        <div>
            <input type="search" placeholder="아이디를 입력하세요" v-model="loginId">
            <input type="password" placeholder="비밀번호를 입력하세요" v-model="loginPassword" v-on:keyup.up.enter="loginSubmit">
        </div>
        <div id= "btn">
            <p id="loginP" v-on:click="loginSubmit">로그인하기</p>
            <div id="spans">
                <span>아이디찾기</span>
                <span>비밀번호찾기</span>
            </div>
            <p id="registerP" @click="Register()">회원가입하기</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            loginId: "",
            loginPassword: "",
        };
    },
    methods: {
        Register() {
            this.$router.push("/register");
        },
        loginSubmit() {
            // 로컬스토리지에 저장
            console.log(this.loginId,this.loginPassword);
            localStorage.setItem(this.loginId, this.loginPassword);
            this.clearInput();
        },
        clearInput() {
            // input폼 비우기
            this.loginId = '';
            this.loginPassword ='';
        }
    }
}
</script>

<style scoped>
/* 기본 폰트 */
/* @font-face {
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
} */
@font-face {
    font-family:"Roboto-Regular";
    src: url('../assets/fonts/Roboto-Regular.ttf') format('truetype');
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
#loginPage{
    position: absolute;
    left: 50%;
    top: 15em;
    transform: translate(-50%, -30%);
}
#titleLoginpage{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto-Regular';
    font-size: var(--font-size-large);
    text-decoration: underline;
    color: #1e212d;
    margin: 70px;
}

input{
    display:block;
    border: none;
    border-bottom: solid 2px var(--color-brown);
    padding-left: 10px;
    padding-right: 60px;
    margin: 30px 0;
    font-size: var(--font-size-small);
}

input:focus{
    outline: none;
    /* background-color: rgb(247, 247, 247); */
    
}

#btn{
    font-weight: bold;
}

p{
    display: flex;
    justify-content: center;
    align-items: center;
}
span{
    font-size: var(--font-size-small);
    color: var(--color-beige);
    margin: 10px 10px;
}

#spans{
    display: flex;
    justify-content: center;
    align-items: center;
}

#loginP{
    margin-top: 50px;
}

#registerP{
    margin-top:10em;
}

</style>