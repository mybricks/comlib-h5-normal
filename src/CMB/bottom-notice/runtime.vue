<template>
    <div>
        <ItemCard headerSrc="http://my.mybricks.world/mfs/files/1695561706060/FyQHBHJ3gRvOGA9EZCX5fpbs9dfiO9qg-1695561706303.png">
            <!-- 在组件里面引入css.样式/或者直接使用下方样式引入会报错/不生效 -->
            <img style="width:95%;margin: 0 auto;border-radius: 10px;border: #F8EED7 2px solid;" class="pic"
                src="http://my.mybricks.world/mfs/files/1695573956590/ZhmDovdubs8HAOOlyrojTDIs0LaNaHHW-1695573956802.png"
                alt="">
        </ItemCard>
    </div>
</template>

<script>
import css from "./index.less";
import ItemCard from "../components/item-card/index.vue";

export default {
    components: {
        ItemCard
    },
    data() {
        return {

        }
    }
};

</script>

<style lang="less">
// .pic {
//     width: 200px;
//     display: flex;
//     justify-content: center;
//     border: #F8EED7 2px solid;
//     border-radius: 10px;
// }
</style>
