<template>
    <div class="com">
        <MyImage class="image mybricks-image" :src="m.data.src" :mode="m.data.mode" @click="onClick" />
    </div>
</template>

<script>
import MyImage from './../../components-vue/image/index.vue';

export default {
    components: {
        MyImage,
    },
    props: ["env", "data", "inputs", "outputs", "title", "m"],
    created() {
        this.inputs["setSrc"]?.((val) => {
            this.data.src = val;
        })
    },
    methods: {
        onLoad() {
            if (!this.env.runtime) {
                return;
            }
            this.inputs["setSrc"]
            this.outputs["onLoad"]();
        },
        onClick() {
            if (!this.env.runtime) {
                return;
            }
            this.outputs["onClick"]();
        },
        onError() {
            if (!this.env.runtime) {
                return;
            }
            this.outputs["onError"]();
        }
    },
};
</script>

<style lang="less" scoped>
.com {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}


.image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
