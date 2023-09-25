<template>
    <div class="wrapper">
        <img class="bg" :src="data.src" @load="onLoad" ref="imageRef" />
        <div class="hotarea" :style="item.style" @click="($event) => { onClickHotarea($event, item); }"
            v-for="(item, index) in list" :key="index"></div>
        <!-- <img :src="data.leftImg" :class="[leftBlockClass, iconClass]" :style="{ top: '50px' }" @click="onBack" /> -->
    </div>
</template>

<script>
export default {
    props: ['env', 'data', 'inputs', 'propsStyle', 'outputs'],
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        onLoad() {
            const naturalWidth = this.$refs.imageRef?.naturalWidth;
            const naturalHeight = this.$refs.imageRef?.naturalHeight;
            if (naturalHeight && naturalWidth) {
                this.data.height = (naturalHeight * 375) / naturalWidth;
            }
        },
        onClickHotarea(e, item) {
        }
    }
}

</script>

<style lang="less" scoped >
@import './../style.less';
</style>
