<template>
    <div>
        <img :class="css.shopImage" :src="_dataSource.img" alt="商品图片">
        <div :class="css.shopTitle">{{ _dataSource.title }}</div>
        <div :class="css.shopPrice">{{ _dataSource.price }}</div>
        <div :class="css.button">{{ _dataSource.buttonText }}</div>
    </div>
</template>

<script>
import css from "./index.less";

export default {
    props: ["inputs", "env"],
    data() {
        return {
            dataSource: {},
            css
        }
    },
    created() {
        this.inputs.install?.((val) => {
            console.log(val);
            this.dataSource = val;
        })
    },
    computed: {
        _dataSource() {
            if (this.env.runtime) {
                return this.dataSource;
            } else {
                return {
                    title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                    price: '￥6429',
                    img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                    buttonText: '月供 ￥305.81起'
                }
            }
        }
    }
}
</script>