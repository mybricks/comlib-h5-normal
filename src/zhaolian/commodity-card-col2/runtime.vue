<template>
    <div class="card">
        <img class="shopImage" :src="_dataSource.img" alt="商品图片">
        <div class="shopTitle">{{ _dataSource.title }}</div>
        <div class="shopPrice">{{ _dataSource.price }}</div>
        <div class="button">月供 ¥{{ _dataSource.monthPrice }} 起</div>
    </div>
</template>

<script>
export default {
    props: ["inputs", "env"],
    data() {
        return {
            dataSource: {},
        }
    },
    created() {
        this.inputs.install?.((val) => {
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
                    monthPrice: '305.81',
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.card {
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .shopImage {
        width: 100%;
        height: auto;
        display: block;
        margin-bottom: 10px;
    }

    .shopTitle {
        margin: 0 auto;
        font-size: 14px;
        margin-bottom: 6px;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    }

    .shopPrice {
        margin: 0 auto;
        font-size: 15px;
        color: #808080;
        margin-bottom: 8px;
        width: max-content;
        font-weight: normal;
    }

    .button {
        background-color: #244274;
        color: white;
        font-weight: normal;
        width: 80%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        border-radius: 3px;
        margin-bottom: 17px;
    }



}
</style>