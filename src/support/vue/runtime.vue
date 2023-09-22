<template>
    <div class="information" @click="onClick">
        <div v-if="data.copyright" class="meta">版权所有：{{ data.copyright }}</div>
        <div class="meta">技术支持：Mybricks 低代码</div>
    </div>
</template>

<script>
export default {
    props: ['env', 'data', 'inputs', 'outputs', 'title'],
    methods: {
        onClick() {
            // Taro.navigateToMiniProgram({
            //   shortLink: "#小程序://HelloMybricks/Jb1aMROpNN9daok",
            //   complete(e) {
            //     console.error(e);
            //   }
            // });
        }
    }
};
</script>

<style scoped>
.information {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;


}

.meta {
    font-size: 10px;
    line-height: 20px;
    color: #cccccc;
    text-align: center;
}
</style>
