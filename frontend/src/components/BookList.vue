<template>
    <div id="Page" style="overflow-y:scroll">
        <h3 class="name">"프로그래밍으로 검색된 결과"</h3>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide>
                <div class="container" @click="Detail()">
                    <div class="bookImage_box">
                        <img src="../assets/img/book-img.png" />
                    </div>
                    <div class="textArea">
                        <div class="bookName" @click="Detail()"><p>자바 ORM 표준 JPA 프로그래밍</p></div>
                        <div class="price"><p>43,000원</p></div>
                        <div class="date"><p>2022-02-03</p></div>
                    </div>
                </div>
            </swiper-slide>    
            <swiper-slide>
                <div class="container" @click="Detail2()">
                    <div class="bookImage_box">
                        <img src="../assets/img/book-img2.png"/>
                    </div>
                    <div class="textArea">
                        <div class="bookName" @click="Detail2()"><p>열혈 C 프로그래밍</p></div>
                        <div class="price"><p>15,000원</p></div>
                        <div class="date"><p>2022-02-03</p></div>
                    </div>
                </div>
            </swiper-slide>    
            <swiper-slide>
                <div class="container" @click="Detail3()">
                    <div class="bookImage_box">
                        <img src="../assets/img/book-img3.png"/>
                    </div>
                    <div class="textArea">
                        <div class="bookName" @click="Detail3()"><p>명품 자바 프로그래밍</p></div>
                        <div class="price"><p>29,000원</p></div>
                        <div class="date"><p>2022-02-03</p></div>
                    </div>
                </div>
            </swiper-slide>     
            <swiper-slide>Slide 4</swiper-slide>     
            <swiper-slide>Slide 5</swiper-slide>     
            <swiper-slide>Slide 6</swiper-slide>     
            <swiper-slide>Slide 7</swiper-slide>     
            <swiper-slide>Slide 8</swiper-slide>     
            <swiper-slide>Slide 9</swiper-slide>     
            <swiper-slide>Slide 10</swiper-slide>   
            <div class="swiper-scrollbar" slot="scrollbar"></div>  
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            <div class="swiper-button-prev" slot="button-prev"></div> 
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div><br><br><br><br><br><br><br><br><br><br><br></div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// import "swiper/swiper-bundle.css";

//import store from "@/src/store";
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data (){
        return {
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,
                scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: true
                },

                // pagination: {
                //     el: '.swiper-pagination',
                //     type: 'bullets',
                //     clickable: true,
                // },

                navigation: {
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev'
                }
                
                // breakpoints: {
                //     1024: {
                //         slidesPerView: 4,
                //         spaceBetween: 40
                //     },
                //     768: {
                //         slidesPerView: 3,
                //         spaceBetween: 30
                //     },
                //     640: {
                //         slidesPerView: 2,
                //         spaceBetween: 20
                //     },
                //     320: {
                //         slidesPerView: 1,
                //         spaceBetween: 10
                //     }
                // },
            }
        };
    },
    methods :{
        Detail() {
         this.$router.push("/detail");
        },
        Detail2() {
         this.$router.push("/detail2");
        },
        Detail3() {
         this.$router.push("/detail3");
        },
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
.name {
    display: grid;
    place-content: center;
    padding: 30px;
}
.swiper { 
    height: 450px; 
    width: 80%; 
    /* background-color: burlywood; */
}
.swiper-slide { 
    display: flex; 
    justify-content: center; 
    align-items: center;   
    /* background-color: cornsilk; */
}
.container{
    padding: 10px;
}
.bookImage_box {
    display: grid;
    place-content: center;
    padding: 5px;
    /* background-color: skyblue; */
}
.textArea {
    font-family: "elice-regular";
    float: left;
}
.bookName {
    font-size: 20px;
}
.price {
    font-size: 20px;
    font-weight: bold;
}
.date {
    font-size: 15px;
    font-weight: bold;
    color: gray;
}

</style>