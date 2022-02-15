<template>
<div>
    <div id="loginPage">
        <h1 id="titleLoginpage">로그인</h1>
        <div>
            <form method="post">
                <input size = "35" type="search" name = "email" placeholder="아이디를 입력하세요" v-model="loginId">
                <input size = "35" type="password" name = "password" placeholder="비밀번호를 입력하세요" v-model="loginPassword" v-on:keyup.up.enter="loginSubmit">
            </form>
        </div>
        <div id= "btn">
            <p id="loginP" v-on:click="loginSubmit">로그인하기</p>
            <div id="spans">
                <span @click='showModal1 = true'>아이디찾기</span>
                <span @click='showModal2 = true'>비밀번호찾기</span>
            </div>
                <button onclick="location.href='http://localhost:3000/auth/kakao'"><img src="../assets/img/kakao_login_medium_wide.png"></button>

            <p id="registerP" @click="Register()">회원가입하기</p>
        
        </div>
        
    </div>
    <modal v-if="showModal1" @close="showModal1 = false">
            <h2 slot="header">아이디 찾기</h2>
            <body slot="body">
                <form>
                    <label>전화번호</label>
                    <input placeholder="전화번호를 입력하세요">
                </form>
            </body>
        </modal>
        <modal v-if="showModal2" @close="showModal2 = false">
            <h2 slot="header">비밀번호 바꾸기</h2>
            <body slot="body">
                <form>
                    <label>아이디</label>
                    <input placeholder="아이디를 입력하세요">
                    <label>전화번호</label>
                    <input placeholder="전화번호를 입력하세요">
                </form>
            </body>
        </modal>
</div>
    
    
</template>

<script>
import Modal from './common/Modal.vue';
import axios from 'axios';
// const HOST = "http://18.117.182.57:3000";

export default {
    components: {
        Modal,
    },
    name: 'LoginForm',
    data() {
        return {
            loginId: "",
            loginPassword: "",
            showModal1: false,
            showModal2: false,
        };
    },
    methods: {
        Register() {
            this.$router.push("/register");
        },
        loginSubmit() {
            // 로컬스토리지에 저장
            localStorage.setItem(this.loginId, this.loginPassword);
            
            try {
        axios.post("http://18.117.182.57:3000/auth/login", {
            // body: {
            //   email: this.login.userEmail,
            //   password: this.login.userPassword,
            // },
            email: this.loginId,
            password: this.loginPassword,
            })
            .then((res) => {
            if (res.status === 200) {
              // console.log(this.$cookies.get("connect.sid"));
            //   console.log(this.cookies.keys().join("\n"));
                console.log("로그인 성공!");
                this.clearInput();
            }
            });
        } catch (error) {
            console.log(error);
        }
        },
        logoutSubmit() {
            
            try {
        axios.get("http://18.117.182.57:3000/auth/logout", {
            })
            .then((res) => {
            if (res.status === 200) {
                console.log("로그아웃 성공!!!!!!!!!!!");
            }
            });
        } catch (error) {
            console.log(error);
        }
        },
        clearInput() {
            // input폼 비우기
            this.loginId = '';
            this.loginPassword ='';
        },
        // giveIdPassword() {
        //     try{
        //         console.log(this.loginId);
        //         axios.post(`http://18.117.182.57:3000/auth/login`,{
        //             email : this.loginId,
        //             password : this.loginPassword
        //         })
        //         .then(res => {
        //             if(res.status == 200){
        //                 console.log(res);
        //             }
        //             console.log(res);
        //         });
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        // }
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
    padding-right: 10px;
    margin: 30px 0;
    font-size: var(--font-size-small);
}

/* input::-ms-clear,
input::-ms-reveal{
	display:none;width:0;height:0;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-results-decoration{
	display:none;
} */

input:focus{
    outline: none;
    /* background-color: rgb(247, 247, 247); */
    
}

button{
    border: none;
    background-color: transparent;
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
    margin-top: 20px;
}

#registerP{
    margin-top:10em;
}

</style>
