<template>
    <div>
        <Header></Header>
        <BookListSearch></BookListSearch>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import BookListSearch from "../components/BookListSearch.vue";
    export default {
        //Javascript - 인스턴스
        components: {
            BookListSearch,
            Header,
        },
    };
</script>

<style>
/* CSS */
</style>
