<template>
    <div>
        <div id="main">
            <h1>CUSTOMER CARE</h1>
            <h3>
                전화번호 <a>010 1234 5678</a><br>
                이메일 <a>epilogue@gmail.com</a><br>
                운영시간 <a>연중무휴 10:00 ~ 22:00</a><br>
                챗봇 상담 <a>어쩌고</a>
            </h3>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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

#main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

h1 { 
    font-size: var(--font-size-mega);
    color: var(--color-beige);
    
}

a{
    color: var(--color-brown);
    float: right;
}

</style>