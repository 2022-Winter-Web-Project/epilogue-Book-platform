<template>
<div class="content">
  <div class="container">
      <div class="bookImage_box">
        <slot name="bookImage"></slot>
      </div>
      <div class="text_area">
        <slot name="bookName"></slot>
        <slot name="bookAuthor"></slot>
        <slot name="bookPrice"></slot>
        <slot name="bookCondition"></slot>
        <div class="text">
          <slot name="bookDescription"></slot>
          <br>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>

.content{
  display: flex;
  height: 700px;
  overflow: auto;
}

.bookImage_box{
  /* float: left; */
  display: grid;
  place-content: center;
  width: auto;
  height: auto;
  padding: 5px;
  background-color: white;
}

.container{
  display: flex;
  width: 60%;
  
  padding: 4%;
  /* background-color: blue; */
}

.content{
  display: flex;
  justify-content: center;
  /* background-color: lightseagreen; */
}

.text_area{
  /* display: grid;
  place-content: center; */
  padding: 0px 20px;
  font-family: "elice-regular";
  /* background-color: plum; */
}

</style>
