<template>
    <div>
        <div :class="css.card">
            <img :class="css.title" src="http://my.mybricks.world/mfs/files/1695561706060/FyQHBHJ3gRvOGA9EZCX5fpbs9dfiO9qg-1695561706303.png" alt="">
            <div :class="css.padding_top"></div>
            <div :class="css.content">
                <!-- <slot id="contant"></slot> -->
                <div :class="css.pic">
                    <img src="http://my.mybricks.world/mfs/files/1695573956590/ZhmDovdubs8HAOOlyrojTDIs0LaNaHHW-1695573956802.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import css from "./index.less";

</script>

<style scoped lang="less"></style>
