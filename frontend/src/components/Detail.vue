<template>
<div id="Page">
    <detail>
        <body slot="bookImage">
            <img src="../assets/img/book-img.png" />
        </body>
        <body slot="bookName">
            <h1>{{ bookNameItem }}</h1>
        </body>
        <body slot="bookAuthor">
            <h2>{{ bookAuthorItem }}</h2>
        </body>
        <body slot="bookPrice">
            <h1>{{ bookPriceItem }}</h1>
        </body>
        <body slot="bookCondition">
           <h2>{{ bookCondtionItem }}</h2>
        </body>
        <body slot="bookDescription">
            <p>{{ bookDescriptionItem }}</p>
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
            bookCondtionItem:"",
            bookDescriptionItem:"",
        };
    },
    mounted: function() {
        // axios.get(`${HOST}/post/list`).then(response => (this.items = response))
        axios.get(`${HOST}/post/list`).then((res) => {
            const { data } = res;
            console.log(data);
            console.log(data[0]);
            console.log(data[0].id);
            console.log(data[0].description);
            this.bookNameItem = data[0].title;
            this.bookAuthorItem = data[0].author;
            this.bookPriceItem = data[0].price;
            this.bookConditionItem = data[0].condition;
            this.bookDescriptionItem = data[0].description;
        });
    }
}
</script>

<style scoped>

</style>
