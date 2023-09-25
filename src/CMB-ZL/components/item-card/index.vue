<template>
    <div>
        <div :class="css.card">
            <img :class="css.title"
                :src="headerSrc"
                alt="">
            <div :class="css.content" :style="{width: '375px',backgroundColor: bgColor}">
                <slot></slot>
 
            </div>
        </div>
    </div>
</template>

<script>
import css from "./index.less";

export default {
    name: 'ItemCard',
    props: {
        headerSrc: {
            type: String,
            default: 'http://my.mybricks.world/mfs/files/1695561706060/FyQHBHJ3gRvOGA9EZCX5fpbs9dfiO9qg-1695561706303.png',
        },
        bgColor:{
            type:String,
            default:'#000'
        }
    },
    data() {
        return {
            css: css
        };
    }
}
</script>

<style scoped lang="less"></style>
