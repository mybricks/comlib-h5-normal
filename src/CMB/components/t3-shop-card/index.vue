<template>
    <div>
        <div :class="css.shopList">
            <div v-for="item in 6" :key="item" :class="css.shopItem">
                <img :class="css.shopImage" src="http://my.mybricks.world/mfs/files/1695612961358/JRG7o0rmOGh5FxC3QaRK4KmpdO8kr9CL-1695612962527.png" alt="商品图片">
                <div :class="css.shopTitle">【咖啡馆】星巴克星选咖啡拿铁270ml</div>
                <div :class="css.shopPrice">20元</div>
            </div>
        </div>
    </div>
</template>

 
<script>
import css from "./index.less";

export default {
    name: 'T3ShopCard',
    props: {
    },
    data() {
        return {
            css: css

        };
    }
}
</script>

<style scoped lang="less"></style>
