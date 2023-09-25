<template>
    <div class="box">
        <div>从研发视角</div>
        <div>输入项：</div>
        <div class="item">{{ dataSource }}</div>
        <div>配置项：</div>
        <div class="item">{{ data }}</div>
    </div>
</template>

<script>
export default {
    props: ["data", "inputs", "env"],
    data() {
        return { dataSource: {} }
    },
    created() {
        this.inputs.install?.((val) => {
            console.log(val);
            this.dataSource = val;
        })
    }
}
</script>

<style lang="less" scoped>
.box {
    width: 170px;
    padding: 12px;
}
</style>
