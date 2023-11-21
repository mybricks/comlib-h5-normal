<template>
    <div class="itemListWrapper">
        <div class="banner"></div>
        <div class="itemListCard mybricks-itemList">
            <div class="itemList" :style="listStyle">
                <template v-if="hasCard">
                    <template v-for="(item, index) in list">
                        <div :key="index" :style="itemStyle">
                            <slot
                                name="card"
                                :env="env" 
                                :inputs="{
                                    install(fn) {
                                        fn(item)
                                    }
                                }"
                                :m="{
                                    env,
                                    inputs: { 
                                        install (fn) {
                                            fn(item)
                                        }
                                    }
                                }"
                            >
                            </slot>
                        </div>
                    </template>
                    <div :class="placeholderClass" v-for="item in 3" :key="item"></div>
                </template>
                <template v-else>
                    <div class="emptyCard">
                        <slot name="card" title="请选择"></slot>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "slots", "outputs", "env"],
    data() {
        return {
            list: [{
                title: '【12期免息】苹果Apple iPhone 14 Pro Max 111',
                price: '￥1234',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                monthPrice: '105.81',
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥5678',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                monthPrice: '205.81',
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥2234',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                monthPrice: '305.81',
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥5678',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                monthPrice: '405.81',
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥6429',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                monthPrice: '505.81',
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥6429',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                monthPrice: '305.81',
            }]
        }
    },
    created() {
    },
    computed: {
        hasCard() {
            return !!this.slots?.['card']?.size;
        },
        listStyle() {
            const { gutter = [8, 8], } = this.data;
            return {
                marginLeft: `-${gutter[0] / 2}px`,
                marginRight: `-${gutter[0] / 2}px`,
                marginBottom: `-${gutter[1]}px`,
            }
        },
        itemStyle() {
            const { gutter = [8, 8], column = 2 } = this.data;
            return {
                paddingLeft: `${gutter[0] / 2}px`,
                paddingRight: `${gutter[0] / 2}px`,
                paddingBottom: `${gutter[1]}px`,
                maxWidth: `${100 / column}%`,
                flexBasis: `${100 / column}%`,
            }
        },
        placeholderClass() {
            switch (+this.data.column) {
                case 2:
                    return "placeholder2";
                case 3:
                    return "placeholder3";
                case 4:
                    return "placeholder4";
            }
        }
    }
}
</script>

<style lang="less" scoped>
.itemListWrapper {
    
    // width: 100%;
    margin: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.banner {
    width: 100%;
    margin-bottom: -10px;
    // height: 54px;
    height: 10px;
    background-position: center bottom;
    background-size: 100% 100%;
    // background-image: url(https://my.mybricks.world/mfs/demo-assets/LE08r1LVUhLhhlSrOjpiVV5a7ycQECUn-1700548338977-image-0bfb4917-0870-4d66-937e-d98a93ee398d.png);
    background-repeat: no-repeat;
}

.itemListCard {
    // padding: 12px;
    display: flex;
    overflow: hidden;
    // background-color: #fae4ff;

    // border-radius: 12px;
    // background-color: #EACCCC;
}
.itemList {
    // width: 100%;
    display: flex;
    flex-flow: row wrap;

    .emptyCard {
        width: 100%;
        height: 90px;
    }

    .placeholder2 {
        overflow: hidden;

        width: 50%;
        height: 0;
    }

    .placeholder3 {
        overflow: hidden;

        width: 33.33%;
        height: 0;
    }

    .placeholder4 {
        overflow: hidden;

        width: 25%;
        height: 0;
    }
}
</style>
