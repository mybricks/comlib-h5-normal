<template>
    <div class="floor">
        <div class="card">
            <div class="top">
                <div class="left">
                    <div class="title">{{m.data.title}}</div>
                    <img class="icon"
                        :src="m.data.icon" @click="iconClick" />
                </div>
                <div class="right"></div>
            </div>
            <div class="content">
                <slot name="card"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data","m"],
    methods:{
        iconClick(){
            console.log("iconClick",this.m.data.iconJumpUrl)
            window.open(this.m.data.iconJumpUrl);
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
