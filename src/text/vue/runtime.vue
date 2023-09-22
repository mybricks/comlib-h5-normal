<template>
    <div :class="textCx" :style="style" @click="onClick" @longpress="onLongPress">
        <span>{{ text }}</span>
    </div>
</template>

<script>
import { ref, watch, computed } from "vue";

export default {
    props: ["env", "data", "inputs", "outputs"],
    setup(props) {

        const textCx = computed(() => {
            let classes = {
                'text': true,
                'mybricks-text': true,
                'ellipsis-line': !!props.data.ellipsis,
            };
            return classes;
        });

        const style = computed(() => {
            if (props.data.ellipsis) {
                return { WebkitLineClamp: props.data.maxLines };
            } else {
                return {};
            }
        });

        const text = computed(() => {
            let t = props.data.text ?? "";
            if (typeof t === "object") {
                return JSON.stringify(t);
            }
            return t;
        });

        const onClick = () => {
            if (!props.env.runtime) {
                return;
            }
            console.warn("onClick");
            props.outputs["onClick"](props.data.text);
        };

        const onLongPress = () => {
            if (!props.env.runtime) {
                return;
            }
            console.warn("onLongPress");
            props.outputs["onLongPress"](props.data.text);
        };

        return {
            textCx,
            style,
            text,
            onClick,
            onLongPress
        };
    },
};
</script>

<style lang="less" scoped>
@import './../style.less';
</style>
