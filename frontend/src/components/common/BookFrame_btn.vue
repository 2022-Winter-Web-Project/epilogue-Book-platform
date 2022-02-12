<template>
  <div class="container">
    <div class="bookImage_box">
      <slot name="bookImage"></slot>
    </div>
    <div class="textArea">
      <div class="bookName">
        <slot name="bookName"></slot>
      </div>
      <div class="price">
        <slot name="bookPrice"></slot>
      </div>
      <div class="date">
        <slot name="bookDate"></slot>
      </div>
      <div class="btnArea">
        <!-- <slot name="postBtn"></slot> -->
        <button
          class="w-btn-outline w-btn-skin-outline"
          type="button"
          @click="modifyPost"
        >
          수정하기
        </button>
        <button class="w-btn-outline w-btn-skin-outline" type="button">
          판매완료
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    modifyPost() {
      this.$router.push("/postUpload");
    },
  },
};
</script>

<style>
.bookImage_box {
  text-align: center;
}
#mainBookImg {
  width: 167px;
  height: 200px;
  object-fit: contain;
}
.textArea {
  display: grid;
  grid-template-columns: 80px 130px;
  /* grid-template-rows: 2 0px; */
  margin: 0;
  font-family: "elice-regular";
}
.bookName {
  text-align: left;
  font-size: 15px;
  grid-column: 1 / 3;
  grid-row: 1;
}
.price {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  grid-column: 1;
  grid-row: 2;
}
.date {
  text-align: left;
  font-size: 10px;
  font-weight: bold;
  color: gray;
  grid-column: 1;
  grid-row: 3;
}
.btnArea {
  grid-column: 2;
  grid-row: 3;
}

.btnArea > .w-btn-outline:nth-child(1) {
  margin-right: 10px;
}
.w-btn-outline {
  position: relative;
  padding: 1px;
  border-radius: 15px;
  font-family: "Roboto-Regular";
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 500;
  transition: 0.25s;
  grid-column: 1;
  grid-row: 3;
}

.w-btn-skin-outline {
  border: 3px solid #f8e6e0;
  color: #6e6e6e;
}
.w-btn-skin-outline:hover {
  background-color: #f8e6e0;
  color: #6e6e6e;
}
.w-btn-outline:hover {
  letter-spacing: 2px;
  transform: scale(1);
  cursor: pointer;
}
.w-btn-outline:active {
  transform: scale(1.5);
}
</style>
