<template>
    <div :class="popupCx" :style="popupStyle">
        <div class="overlay" @click="handleOverlayClick"></div>
        <div :class="mainCx">
            <div class="entry">
                <div v-if="data.popupTitle" class="title mybricks-title">{{ data.popupTitle }}</div>
                <div :class="contentClasses" :style="data.contentStyle">
                    <slot name="content"></slot>
                </div>
            </div>
            <div v-if="data.visibleClose" class="close" @click="handleCloseClick"></div>
        </div>
    </div>
</template>

<script>
import { isEdit, isDesigner } from "../../utils/env";

export default {
    props: ["data", "inputs", "outputs", "env", "_env", "slots", "createPortal"],
    data() {
        return {
            show: false
        }
    },
    computed: {
        popupCx() {
            return {
                "popup": true,
                "show": true
            }
        },
        mainCx() {
            return {
                main: true,
                "mybricks-main": true,
                center: this.data.position === "center",
                top: this.data.position === "top",
                bottom: this.data.position === "bottom",
                left: this.data.position === "left",
                right: this.data.position === "right",
            }

        },
        contentClasses() {
            console.log(this.slots);
            console.log(this.slots?.["content"]);
            console.log(this.slots?.["content"]?.size);
            
            return {
                content: true,
                empty: this.slots?.["content"]?.size === 0,
                "mybricks-content": true,
            }
        },
        popupStyle() {
            if (isEdit(this.env)) {
                /** 新场景需要一个宽高 */
                return {
                    width: '375px',
                    height: '667px',
                    position: "relative",
                };
            }
            if (isDesigner(this.env)) {
                /** 设计器runtime时需要fixed会相对于更上层的元素 */
                return {
                    // position: 'absolute',
                    width: '375px',
                };
            }
            return {};
        }
    },

    created() {
        console.warn(this.env)
        this.show = this.env.edit ? true : false;

        this.inputs["open"]?.(() => {
            console.log("open");
            console.log("open");
            console.log("open");
            this.show = true;
        });

        this.inputs["onShow"]?.(() => {
            this.show = true;
        });

        this.inputs["onHide"]?.(() => {
            this.handleClose();
        });
    },
    methods: {
        handleOverlayClick() {
            if (this.data.maskClose) {
                this.handleClose();
            }
        },
        handleCloseClick() {
            this.handleClose();
        },
        handleClose() {
            this._env?.currentScenes?.close?.();
            this.show = false;
        }

    }
};

</script>

<style scoped lang="less">
@import "./../style.less";
</style>
