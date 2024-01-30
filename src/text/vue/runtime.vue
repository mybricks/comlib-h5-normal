<template>
    <div :class="textCx" :style="style" @click="onClick">
        <span>{{ data.text }}</span>
    </div>
</template>

<script>
export default {
    props: ["env", "data", "inputs", "outputs"],
    computed: {
        textCx() {
            return {
                'text': true,
                'mybricks-text': true,
                'ellipsis-line': !!this.data.ellipsis,
            };
        },
        style() {
            if (this.data.ellipsis) {
                return { WebkitLineClamp: this.data.maxLines };
            } else {
                return {};
            }
        },
        text() {
            let t = this.data.text ?? "";
            if (typeof t === "object") {
                return JSON.stringify(t);
            }
            return t;
        }
    },
    created() {
        this.inputs.value?.((val) => {
            this.data.text = val;
        });
    },
    methods: {
        onClick() {
            if (!this.env.runtime) {
                return;
            }
            this.outputs["onClick"](this.data.text);
        },
        onLongPress() {
            if (!this.env.runtime) {
                return;
            }
            this.outputs["onLongPress"](this.data.text);
        }
    },
}
</script>

<style lang="less" scoped>
@import './../style.less';
</style>
