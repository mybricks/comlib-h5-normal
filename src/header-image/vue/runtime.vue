<template>
    <div :class="wrapperClass">
        <img :src="imageUrl" @load="onLoad" ref="imageRef" :class="bgClass" />
        <img :src="data.leftImg" :class="[leftBlockClass, iconClass]" :style="{ top: '50px' }" @click="onBack" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import css from './../style.less';

const { env, data, inputs, propsStyle, outputs } = defineProps(['env', 'data', 'inputs', 'propsStyle', 'outputs']);

const imageRef = ref(null);

const imageUrl = computed(() => data.src);

const onLoad = () => {
    const naturalWidth = imageRef.value?.naturalWidth;
    const naturalHeight = imageRef.value?.naturalHeight;
    if (naturalHeight && naturalWidth) {
        data.height = (naturalHeight * 414) / naturalWidth;
    }
};

const onBack = () => {
    console.log('点击了返回按钮');
};

const wrapperClass = css.wrapper;
const bgClass = css.bg;
const leftBlockClass = css.leftBlock;
const iconClass = css.icon;
</script>

<style scoped>

</style>
