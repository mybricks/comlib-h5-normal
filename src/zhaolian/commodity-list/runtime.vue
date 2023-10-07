<template>
    <div class="itemList mybricks-itemList">
        <template v-if="hasCard">
            <template v-for="(item, index) in list">
                <div :class="itemClass" :key="index">
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
                buttonText: '月供 ￥105.81起'
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥5678',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥205.81起'
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥2234',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥305.81起'
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥5678',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥405.81起'
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥6429',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥505.81起'
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥6429',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥305.81起'
            }]
        }
    },
    created() {
    },
    computed: {
        hasCard() {
            return !!this.slots?.['card']?.size;
        },
        itemClass() {
            switch (+this.data.column) {
                case 2:
                    return "item2";
                case 3:
                    return "item3";
                case 4:
                    return "item4";
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
.itemList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #EACCCC;

    .emptyCard {
        width: 100%;
        height: 90px;
    }

    .item2 {
        overflow: hidden;
        width: 50%;
        height: 100%;
    }

    .item3 {
        overflow: hidden;

        width: 33.33%;
        height: 100%;
    }

    .item4 {
        overflow: hidden;

        width: 25%;
        height: 100%;
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
