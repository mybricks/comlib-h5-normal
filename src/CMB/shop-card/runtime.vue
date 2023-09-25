<template>
    <div>
        <ItemCard
            headerSrc="http://my.mybricks.world/mfs/files/1695613909224/yFtKHSFBgAvNOo7aYD0iZxEVb8gwwDne-1695613909776.png">
            <T3ShopCard></T3ShopCard>
        </ItemCard>
    </div>
</template>

<script>
import css from "./index.less";
import ItemCard from "../components/item-card/index.vue";
import T3ShopCard from "../components/t3-shop-card/index.vue";

export default {
    components: {
        ItemCard,
        T3ShopCard
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
