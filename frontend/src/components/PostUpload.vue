<template>
  <div class="outer_container">
    <div class="inner_container">
      <div class="mid">
        <form class="item" id="titleForm">
          <input type="text" name="title" placeholder="제목을 입력해 주세요." />
        </form>
        <div class="item" id="imgFrame">
          <img
            v-bind:src="bookImg"
            style="width: 190px; height: 285px; object-fit: contain"
          />
        </div>
        <input
          ref="upload_images"
          id="upload_image"
          type="file"
          class="w-btn-outline w-btn-skin-outline"
          @change="uploadImage()"
        />
        <button class="w-btn-outline w-btn-skin-outline" type="button">
          <label for="upload_image">사진 첨부</label>
        </button>
        <div class="item" id="formBox">
          <form id="middleForm">
            <input
              type="text"
              name="title"
              placeholder="책 제목"
              v-model="title"
            />
            <input
              type="text"
              name="author"
              placeholder="작가"
              v-model="author"
            />
            <input
              type="text"
              name="publisher"
              placeholder="출판사"
              v-model="publisher"
            />
            <input
              type="text"
              name="price"
              placeholder="판매가격"
              v-model="price"
            />
            <div id="conditionLabelGroup">
              <label
                for="conditionRadioBtn1"
                class="conditionBtn w-btn-skin-outline"
                >최하</label
              >
              <label
                for="conditionRadioBtn2"
                class="conditionBtn w-btn-skin-outline"
                >하</label
              >
              <label
                for="conditionRadioBtn3"
                class="conditionBtn w-btn-skin-outline"
                >중</label
              >
              <label
                for="conditionRadioBtn4"
                class="conditionBtn w-btn-skin-outline"
                >상</label
              >
              <label
                for="conditionRadioBtn5"
                class="conditionBtn w-btn-skin-outline"
                >최상</label
              >
            </div>
          </form>
          <div id="conditionInputGroup">
            <input
              type="radio"
              name="condition"
              id="conditionRadioBtn1"
              value="1"
              v-model="conditionValue"
            />
            <input
              type="radio"
              name="condition"
              id="conditionRadioBtn2"
              value="2"
              v-model="conditionValue"
            />
            <input
              type="radio"
              name="condition"
              id="conditionRadioBtn3"
              value="3"
              v-model="conditionValue"
            />
            <input
              type="radio"
              name="condition"
              id="conditionRadioBtn4"
              value="4"
              v-model="conditionValue"
            />
            <input
              type="radio"
              name="condition"
              id="conditionRadioBtn5"
              value="5"
              v-model="conditionValue"
            />
          </div>
        </div>
      </div>

      <div class="end">
        <div class="descriptionBox">
          <textarea
            type="text"
            name="description"
            placeholder="설명"
            v-model="description"
          >
          </textarea>
        </div>
        <div class="submitBtn">
          <button
            class="w-btn-outline w-btn-skin-outline"
            type="button"
            @click="uploadPost"
          >
            등록하기
          </button>
          <button
            class="w-btn-outline w-btn-skin-outline"
            type="button"
            @click="modifyPost"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const HOST = "http://18.117.182.57:3000";

export default {
  data() {
    return {
      title: "",
      author: "",
      publisher: "",
      price: "",
      description: "",
      bookImg: "",
      images: "",
      conditionValue: [],
      responseData: "",
      err_message:
        "작성하지 않거나 업로드하지 않은 항목이 있는지 다시 한 번 확인하세요.",
    };
  },
  methods: {
    checkInput() {
      if (
        !this.title ||
        !this.author ||
        !this.publisher ||
        !this.price ||
        !this.condition ||
        !this.description ||
        !this.images
      ) {
        return false;
      }
    },
    uploadImage() {
      this.images = this.$refs.upload_images.files;
      console.log(this.images);
    },
    uploadPost() {
      if (this.checkInput() === false) {
        alert(this.err_message);
      } else {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("author", this.author);
        formData.append("publisher", this.publisher);
        formData.append("price", this.price);
        formData.append("condition", this.conditionValue);
        formData.append("description", this.description);
        formData.append("images", this.$refs.upload_images.files[0]);

        try {
          axios
            .post(`${HOST}/auth/upload/s3`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("게시물 업로드 성공!");
                console.log(res);
                this.$router.push("/userProfile");
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    modifyPost() {
      if (this.checkInput() === false) {
        alert(this.err_message);
      } else {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("author", this.author);
        formData.append("publisher", this.publisher);
        formData.append("price", this.price);
        formData.append("condition", this.conditionValue);
        formData.append("description", this.description);
        formData.append("images", this.$refs.upload_images.files[0]);
        formData.append("post_id", this.$route.params.postId);

        try {
          axios
            .post(`${HOST}/post//modify`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("게시물 수정 성공!");
                console.log(res);
                this.$router.push("/userProfile");
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.postId === "number") {
      axios.get(`${HOST}/post/${this.$route.params.postId}`).then((res) => {
        this.responseData = res.data;
        console.log(this.responseData);
        this.title = res.data.title;
        this.author = res.data.author;
        this.publisher = res.data.publisher;
        this.price = res.data.price;
        this.conditionValue = res.data.conditionValue;
        this.description = res.data.description;
        this.bookImg = res.data.Files[0].original_url;
      });
    }
  },
  created() {
    console.log(this.$route.params.postId);
  },
};
</script>

<style scoped>
/* 기본 폰트 */
@font-face {
  font-family: "Roboto-Regular";
  src: url("../assets/fonts/Roboto-Regular.ttf") format("truetype");
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
.outer_container {
  height: 700px;
  overflow: auto;
  text-align: center;
  /* background: #67917d; */
}
.inner_container {
  display: inline-block;
  width: 600px;
  margin-bottom: 100px;
  /* background: #eabf9f; */
}

#titleForm > input {
  display: block;
  border: none;
  border-radius: 5px;
  border-bottom: solid 2px var(--color-brown);
  width: 600px;
  margin: 30px 0;
  font-size: var(--font-size-small);
}

.mid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
#titleForm {
  display: none;
  grid-column: 1 / 4;
  grid-row: 1;
}
#imgFrame {
  width: 190px;
  height: 285px;
  border-radius: 10px;
  background: #eeecec;
}
#fromBox {
  grid-column: 2 / 4;
  grid-row: 3;
}
#middleForm > input:nth-child(-n + 5) {
  display: block;
  border: none;
  border-bottom: solid 2px var(--color-brown);
  padding-top: 11px;
  padding-bottom: 11px;
  padding-right: 200px;
  margin: 0 20px 20px;
  place-content: center;
  font-size: var(--font-size-small);
}

#conditionLabelGroup {
  display: flex;
  justify-content: space-around;
  width: 380px;
  margin-left: 10px;
  text-align: center;
}

#conditionLabelGroup > label {
  display: inline-block;
  border: 2px solid var(--color-brown);
  color: #6e6e6e;
  width: 40px;
  height: 40px;
  /* text-align: center; */
  font-size: 10px;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  display: grid;
  place-content: center;
}

.conditionBtn:hover {
  letter-spacing: 2px;
  transform: scale(1.1);
  cursor: pointer;
}

#conditionInputGroup > input {
  visibility: hidden;
}

/* btn */
#upload_image {
  display: none;
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
  margin-left: 20px;
  margin-right: 20px;
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

input:focus {
  outline: none;
}

.end {
  text-align: center;
  margin-top: 30px;
}

.descriptionBox > textarea {
  display: inline-block;
  width: 600px;
  height: 200px;
  border: 3px solid #eeecec;
  border-radius: 10px;
}

.submitBtn {
  font-weight: bold;
}
</style>
