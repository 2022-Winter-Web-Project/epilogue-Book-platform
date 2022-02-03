<template>
    <div>
        <Header></Header>
        <BookList></BookList>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import BookList from "../components/BookList.vue";
    export default {
        //Javascript - 인스턴스
        components: {
            BookList,
            Header,
        },
    };
</script>

<style>
/* CSS */
</style>
