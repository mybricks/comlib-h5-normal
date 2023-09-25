<template>
    <div class="couponList">
        <template v-if="hasCard">
            <template v-for="(item, index) in list">
                <div class="item" :key="index">
                    <slot name="card" :env="env" :inputs="{
                        install(fn) {
                            fn(item)
                        }
                    }"></slot>
                </div>
            </template>
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
                title: '满20元使用',
                text: '3期及以上享用',
                img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
            }, {
                title: '满100元使用',
                text: '6期及以上享用',
                img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
            }]
        }
    },
    created() {
    },
    computed: {
        hasCard() {
            return !!this.slots['card']?.size;
        }
    }
}
</script>

<style lang="less" scoped>
.couponList {
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #EACCCC;
    // padding-bottom: 20px;

    .emptyCard {
        background: red;
        width: 100%;
        height: 90px;
    }

    .item {
        width: 100%;
        height: 100%;
    }

    .box {
        width: 170px;
        height: 130px;
        border-radius: 8px;
        position: relative;

        .inner_box {
            width: 170px;
            height: 101px;
            background: linear-gradient(180deg, #F4E3E0 0%, #CF504A 100%);
            position: absolute;
            bottom: 0px;
            border-radius: 8px;

        }

        .coupon {
            background: radial-gradient(50% 50% at 50% 50%, #FFFEFE 0%, #FAECEE 100%);
            width: 148px;
            height: 110px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            position: absolute;
            top: 13px;
            left: 10px;
            border: #ffffff 2px solid;

            .top_icon {
                width: 100px;
                top: 0px;
                left: 22px;
                position: absolute;
            }

            .container {
                width: 90%;
                height: 50px;
                margin: 0 auto;
                margin-top: 25px;
                display: flex;
                flex-direction: row;

                .round {
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    background-color: #fff;
                    filter: drop-shadow(-3px 1px 2px #F6E0E2);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 40px;
                        object-fit: contain;

                    }
                }

                .desc {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: 6px;

                    .title {
                        font-size: 13px;
                        font-weight: bold;
                    }

                    .text {
                        font-size: 11px;
                        font-weight: bold;
                        color: #CA4D35;
                    }
                }

            }
        }

        .button {
            width: 170px;
            height: 33px;
            object-fit: cover;
            background-color: orange;
            position: absolute;
            bottom: 0px;
            border-radius: 8px;
            overflow: hidden;
            z-index: 10;
        }
    }


}
</style>
