<template>
    <div class="button mybricks-button" style="height:100%" @click="handleClick">
        <div class="text">{{ data.text }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { env, data, logger, slots, inputs, outputs, title } = defineProps([
    'env', 'data', 'logger', 'slots', 'inputs', 'outputs', 'title'
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
.button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    background: #fa6400;
    color: #ffffff;
    border-radius: 60px;
    border-width: 0px;
    border-style: solid;
    font-size: 14px;

    &::after {
        display: none;
    }

    .text {
        width: 100%;
    }
}
</style>
