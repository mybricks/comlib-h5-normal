<template>
    <div class="button mybricks-button" @click="handleClick">
        <div class="text">{{ data.text }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { env, data, inputs, outputs } = defineProps([
    'env', 'data', 'inputs', 'outputs'
]);

const handleClick = (ev) => {
    if (env.runtime) {
        ev.stopPropagation();
        outputs["onClick"](true);
    }
}

onMounted(() => {
    inputs["buttonText"]?.((val) => {
        data.text = val;
    });
});
</script>


<style scoped lang="less">
@import './../style.less';
</style>
