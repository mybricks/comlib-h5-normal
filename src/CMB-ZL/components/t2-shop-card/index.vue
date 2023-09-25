<template>
    <div>
        <div :class="css.shopList">
            <div v-for="item in 6" :key="item" :class="css.shopItem">
                <img :class="css.shopImage" src="http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png" alt="商品图片">
                <div :class="css.shopTitle">【12期免息】苹果Apple iPhone 14 Pro Max</div>
                <div :class="css.shopPrice">￥6429</div>
                <div :class="css.button">月供 ￥305.81起</div>
            </div>
        </div>
    </div>
</template>

 
<script>
import css from "./index.less";

export default {
    name: 'T2ShopCard',
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
