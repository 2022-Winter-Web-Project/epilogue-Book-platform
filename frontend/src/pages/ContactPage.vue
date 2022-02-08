<template>
    <div>
        <Header></Header>
        <Contact></Contact>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import Contact from "../components/Contact.vue";
    export default {
        //Javascript - 인스턴스
        components: {
            Contact,
            Header,
        },
    };
</script>

<style>
/* CSS */
</style>