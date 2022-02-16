<template>
<div id="Page">
    <detail>
        <body slot="bookImage">
            <img v-bind:src="image" style="width:234px; height:310px; object-fit: contain"/>
        </body>
        <body slot="bookName">
            <p style="font-size:25px; font-weight:bold; margin:20px">{{ bookNameItem }}</p>
        </body>
        <body slot="bookAuthor">
            <p style="font-size:20px; font-weight:bold; margin:20px">{{ bookAuthorItem }}</p>
        </body>
        <body slot="bookPrice">
            <p style="font-size:25px; font-weight:bold; margin:20px">{{ bookPriceItem }}원</p>
        </body>
        <body slot="bookCondition">
           <p style="font-size:20px; font-weight:bold; margin:20px">{{ bookConditionItem }}</p>
        </body>
        <body slot="bookDescription">
            <p style="margin:10px">{{ bookDescriptionItem }}</p>
         </body>
    </detail>
</div>
</template>

<script>
import detail from "./common/BookFrame2.vue";
import axios from "axios";
const HOST = "http://18.117.182.57:3000";

export default {
    components: {
        detail,
    },
    data(){
        return{
            bookNameItem: "",
            bookAuthorItem:"",
            bookPriceItem: "",
            bookConditionItem:"",
            bookDescriptionItem:"",
            image: "",
        };
    },
    mounted: function() {
        // axios.get(`${HOST}/post/list`).then(response => (this.items = response))
        axios.get(`${HOST}/post/${this.$route.params.postId}`).then((res) => {
            const { data } = res;
            console.log(data);
            this.bookNameItem = data.title;
            this.bookAuthorItem = data.author;
            this.bookPriceItem = data.price;
            this.bookConditionItem = data.condition;
            this.bookDescriptionItem = data.description;
            this.image = data.Files[0].url;
            console.log(this.image);
        });
    }
}
</script>

<style scoped>


</style>
