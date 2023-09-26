<template>
    <div class="button mybricks-button" @click="handleClick">
        <div class="text">{{ data.text }}</div>
    </div>
</template>

<script>

export default {
    props: ['env', 'data', 'inputs', 'outputs'],
    data() {
        return {
            text: '按钮'
        }
    },
    methods: {
        handleClick(ev) {
            if (this.env.runtime) {
                ev.stopPropagation();
                this.outputs["onClick"](true);
            }
        }
    },
    mounted() {
        this.inputs["buttonText"]?.((val) => {
            this.data.text = val;
        });
    }
}




</script>


<style scoped lang="less">
@import './../style.less';
</style>
