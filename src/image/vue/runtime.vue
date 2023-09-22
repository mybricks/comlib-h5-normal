<template>
    <div class="com">
        <img class="image" :src="data.src" @click="onClick">
    </div>
</template>

<script>

export default {
    props: ["env", "data", "inputs", "outputs", "title", "style"],
    setup(props) {
        const onLoad = () => {
            if (!props.env.runtime) {
                return;
            }
            props.inputs["setSrc"]
            props.outputs["onLoad"]();
        };

        const onClick = () => {
            if (!props.env.runtime) {
                return;
            }
            props.outputs["onClick"]();
        };

        const onError = () => {
            if (!props.env.runtime) {
                return;
            }
            props.outputs["onError"]();
        };

        return {
            onLoad,
            onClick,
            onError,
        };
    },
};
</script>

<style scoped>
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
