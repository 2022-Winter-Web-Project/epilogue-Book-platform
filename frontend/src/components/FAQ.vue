<template>
 <!-- html -->
    <div class="FAQ">
      <div class="container">
        <div class="boxes">
          <div class="box">
            <div class="smallBox">
              <h1 class="text">Q</h1>
              <p class="text">책 상태의 분류기준</p>
            </div> 
            <div class="smallBox">
              <h1 class="text">A</h1>
              <p class="text">저희 에필로그는 도서 중고 직거래 사이트인 만큼 책의 상태는 판매자의 개인 재량에 맡기고 있어요. 일반적인 기준은 다음과 같아요.<br>
                <br>최상 - 어떠한 손상을 입지 않고 새 제품과 차이가 없는 책<br>
                상 - 작은 손상(구겨짐·글을 가리지 않는 수준의 작은 낙서 등)을 입은 페이지가 2-3 페이지 미만의 책<br>
                중 - 작은 손상을 입은 페이지가 10장 미만인 책<br> 
                하 - 큰 손상(밑줄·형광펜 등 글 을 가리는 낙서·표지를 알아보기 힘들 정도의 빛바램 등)을 입은 책<br>
                최하 - 매우 큰 손상(페이지 혹은 표지의 유실·젖음 등)을 입은 책</p>
            </div>            
          </div>
               
          <div class="box">
            <div class="smallBox">
              <h1 class="text">Q</h1>
                <p class="text">에필로그에서 지켜야 할 매너</p>
            </div>
            <div class="smallBox">
              <h1 class="text">A</h1>
                <p class="text">여러분의 작은 친절이 이웃에게 큰 감동을 줄 수 있어요. 에필로그의 모든 사용자가 우리 동네의 이웃이라는 점을 기억해 주세요.<br>
                기본 매너<br><br>
                • 모두의 시간은 소중합니다. 시간약속을 꼭 지켜주세요.<br>
                • 늦은 시간 연락은 부담스러울 수 있어요. 특히 새벽 시간에는 자제해 주세요.<br>
                • 택배 거래는 부둑이한 경우에만 요청하시고 가능한 직거래로 해주세요.
                <br><br>
                구매자 매너<br>
                • 신중하게 고민한 뒤 판매자와 확실하게 거래 약속을 잡아요.<br>
                • 질문하기 전에 판매글을 꼼꼼히 읽어 주세요.<br>
                • 지나치게 가격을 깍지 말아 주세요. 가격제안 할 수 있는 경우에만 가격제안 해주세요.<br>
                • 직거래할 땐 판매자에게 가까운 장소에서 만나요.<br>
                • 물건 금액에 맞게 현금을 미리 준비해 주세요.<br>
                <br>
                판매자 매너<br>
                • 직접 촬영한 사진으로 판매글을 작성해 주세요.<br>
                • 책에 대한 설명은 자세하게 써주세요. 특히, 주요 하자에 대한 내용은 꼭 명시해 주세요. (명시되지 않은 하자는 환불사유가 돼요.)<br>
                • 거래 약속이 정해지면 게시글의 제목 앞에 '예약중'을 붙여주세요.<br>
                • 예약한 분이 있다면 그분에게 판매해 주세요.</p>
            </div>    
          </div> 

          <div class="box">
            <div class="smallBox">
              <h1 class="text">Q</h1>
                <p class="text">글 작성하는 방법</p>
            </div>
            <div class="smallBox">
              <h1 class="text">A</h1>
                <p class="text">판매글 작성하는 방법<br>[판매글은 마이페이지 아이콘 클릭 > + 버튼 클릭]에서 판매글을 자유롭게 작성해 주시면 돼요.<br>
                 사진 첨부파는 방법 <br> 판매글 작성화면에서 사진 첨부 버튼은 눌러보세요. 사진을 첨부할 수 있어요.<br><br>
                 우리집에 잠들어 있는 책의 새로운 여행을 도와주세요!
                </p>
            </div>      
          </div>    

          <div class="box">
            <div class="smallBox">
              <h1 class="text">Q</h1>
                <p class="text">회원가입하는 방법</p>
            </div>
            <div class="smallBox">
              <h1 class="text">A</h1>
                <p class="text">메인 헤더의 [로그인/회원가입 > 회원가입하기]를 통해 회원가입 페이지로 넘어갈 수 있어요. 휴대전화 본인인증을 통해 회원가입이 가능해요.</p>
            </div> 
          </div>  
          <div><br><br><br></div>   
        </div> 
      </div>  
    </div>
</template>

<script>
export default {
    methods :{
        FAQ() {
         this.$router.push("/FAQ");
        }
    }
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
/* CSS */
.FAQ{
  display: flex;
  height: 700px;
  overflow: auto;
}
.container{
  display: inline-block;
  width: 1300px;
  margin: 0 auto;
}
.boxes{
  margin: 40px;
}
.box{
  background-color: #faf3e0;
  margin: 10px;
  padding: 10px;
  font-family: "elice-regular";
}
.smallBox {
  background-color: #b68973;
  padding: 10px;
  margin: 10px;
}
.text {
  display: inline;
  margin: 5px;
  color: white;
  font-size: var(--font-size-regular);
}
</style>

