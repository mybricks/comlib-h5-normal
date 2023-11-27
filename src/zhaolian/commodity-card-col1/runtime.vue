<template>
    <div class="card">
        <div class="cover">
            <img class="cover-image" :src="_dataSource.img" alt="商品图片">
        </div>
        <div class="content">
            <div class="title">{{ _dataSource.title }}</div>
            <div class="bottom">
                <div class="price">{{ _dataSource.price }}</div>
                <div class="button">{{ _dataSource.monthPrice }}</div>
            </div>
        </div>
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
            return this.dataSource;
            
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
    width: 100%;
    height: 100px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;

    .cover {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 6px;
        margin-left: 10px;
        overflow: hidden;
    }

    .cover-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
    }
}

.content {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
        height: 44px;
        font-size: 14px;
        color: #222222;
        line-height: 22px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 220px;
        height: 36px;
        background-size: 220px 36px;

        .price {
            display: flex;
            align-items: baseline;
            color: #080b10;
            letter-spacing: -1px;
            font-size: 20px;
            line-height: 20px;
            font-weight: 500;
        }

        .button {
            width: 87px;
            height: 36px;
            border-radius: 18px;
            background-color: #080b10;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            color: #fff;
        }
    }
}
</style>