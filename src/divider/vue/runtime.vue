<template>
    <div class="imgWrapperClass height">
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    name: "MyComponent",
    props: ["env", "data", "inputs", "outputs", "title", "style"],
    computed: {
        imgWrapperClass() {
            return this.$style.imgWrapper;
        },
    },
};
</script>

<style scoped>
@import "./../style.less";
.height {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
.line{
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
}
</style>
