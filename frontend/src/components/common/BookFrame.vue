<template>
  <div class="container" @click="Detail()">
    <div class="bookImage_box">
      <slot name="bookImage">
        <!-- img -->
      </slot>
    </div>
    <div class="textArea">
      <div class="bookName" @click="Detail()">
        <slot name="bookName">
          <!-- <p>자바 ORM 표준 JPA 프로그래밍</p> -->
        </slot>
      </div>
      <div class="price">
        <slot name="bookPrice">
          <!-- <p>43,000원</p> -->
        </slot>
      </div>
      <div class="date">
        <slot name="bookDate">
          <!-- <p>2022-02-03</p> -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.bookImage_box {
  display: grid;
  place-content: center;
  /* padding: 5px; */
  width: 195px;
  height: 259px;
  border-radius: 10px;
  background: #eeecec;
  text-align: center;
}
.bookImage_box > body > img:nth-child(n + 2) {
  display: none;
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
