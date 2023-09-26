<template>
    <div class="com">
        <img class="image" :src="data.src" @click="onClick">
    </div>
</template>

<script>
export default {
    props: ["env", "data", "inputs", "outputs", "title", "propsStyle"],
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
