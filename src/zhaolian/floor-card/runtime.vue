<template>
    <div class="floor">
        <div class="card">
            <div class="top">
                <div class="left">
                    <div class="title">积分抽奖</div>
                    <img class="icon"
                        src="http://my.mybricks.world/mfs/files/1695735267201/uh8M6lZXGToHxEZxIO1J4HvqENrj05JK-1695735267793.png" />
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
    props: ["data"],
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
