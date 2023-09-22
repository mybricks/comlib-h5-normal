<template>
    <div :class="popupCx">
        <div :class="css.overlay" @click="handleOverlayClick"></div>
        <div :class="mainCx">
            <div :class="contentClasses" :style="data.contentStyle">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import css from "./../style.less";

export default {
    props: {
        env: Object,
        _env: Object,
        data: Object,
        inputs: Object,
        outputs: Object,
        slots: Object,
        createPortal: Function,
    },
    setup(props) {
        const show = ref(props.env.edit ? true : false);

        const handleClose = () => {
            props._env?.currentScenes?.close?.();
            show.value = false;
        };

        watchEffect(() => {
            props.inputs["onShow"]?.(() => {
                show.value = true;
            });
            props.inputs["onHide"]?.(() => {
                handleClose();
            });
        });

        const popupCx = computed(() => ({
            [css.popup]: true,
            // [css.show]: show.value,
            [css.show]: true
        }));

        const mainCx = computed(() => ({
            [css.main]: true,
            [css.center]: props.data.position === "center",
            [css.top]: props.data.position === "top",
            [css.bottom]: props.data.position === "bottom",
            [css.left]: props.data.position === "left",
            [css.right]: props.data.position === "right",
        }));

        const handleOverlayClick = () => {
            if (props.data.maskClose) {
                handleClose();
            }
        };

        const contentClasses = computed(() => ({
            [css.content]: true,
            // [css.empty]: !props.slots["content"],
            "mybricks-content": true,
        }));

        return {
            popupCx,
            mainCx,
            handleOverlayClick,
            contentClasses,
            show,
            handleClose,
            css
        };
    },
};

</script>

<style scoped>
</style>
