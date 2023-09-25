<template>
    <div>
        <ItemCard bgColor="black"
            headerSrc="http://my.mybricks.world/mfs/files/1695623624389/AisY26zJAxvA8xxg87rHNDscyCj1IsDZ-1695623625003.png">
            <T2ShopCard>

                
            </T2ShopCard>
        </ItemCard>
    </div>
</template>

<script>
import css from "./index.less";
import ItemCard from "../components/item-card/index.vue";
import T2ShopCard from "../components/t2-shop-card/index.vue";

export default {
    components: {
        ItemCard,
        T2ShopCard
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
