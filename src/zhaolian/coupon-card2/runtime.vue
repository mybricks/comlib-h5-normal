<template>
    <div class="couponCard" @click="fetch(dataSource)">
        <div class="smallView">
            <div class="priceArea">
                <div class="price">
                    <span class="label">¥</span>
                    <span class="number">10</span>
                </div>
                <div class="condition">{{ _dataSource.title }}</div>
            </div>
            <div class="infoArea">
                <div class="infoTitles">
                    {{ _dataSource.text }}
                </div>
                <div class="infoBtn">立即领取</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props: ["m", "fetch", "inputs"],
    props: ["inputs"],
    data() {
        return {
            dataSource: {},
            m: {},
            fetch: () => { },
        }
    },
    created() {
        this.inputs.install?.((val) => {
            console.error("inputttt", val);

            this.dataSource = val.dataSource;
            this.m = val.m;
            this.fetch = val.fetch;
        })
    },
    computed: {
        _dataSource() {
            return {
                title: "券信息",
                text: "使用条件",
                img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
            }

            // if (this.m.env.runtime) {
            //     return this.dataSource;
            // } else {
            //     return {
            //         title: "券信息",
            //         text: "使用条件",
            //         img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
            //     }
            // }
        }
    }
}
</script>

<style lang="less" scoped>
.couponCard {
    display: inline-block;
    position: relative;
    width: 100%;
    padding: 6px;

    .smallView {
        display: flex;
        flex-direction: column;
        background: url('https://ali2.a.kwimgs.com/kos/nlav11092/fangzhou/pub/compress/image-65845e81-ee28-4ecb-aea1-b24e1e3ed333.png');
        background-size: 100% 100%;

        .priceArea {
            width: 100%;
            height: 72px;

            .label {
                font-size: 16px;
            }

            .number {
                font-size: 32px;
                line-height: 42px;
            }

            .condition {
                font-size: 12px;
                line-height: 1;
            }
        }
    }

    .priceArea {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ff0063;

        .price {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;
        }
    }

    .infoArea {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        flex-grow: 290;
        height: 30px;

        .infoTitles {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 12px;
        }

        .infoBtn {
            font-size: 12px;
            text-align: center;
            background: #ff0063;
            color: white;
            font-weight: bold;
            border-radius: 14px;
            width: 60px;
            line-height: 24px;
        }
    }

    .tipBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        color: #ff0063;
        font-size: 12px;
        line-height: 34.5px;
        font-weight: bold;
    }

    .mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0.5;
        background: #fff;
        pointer-events: none;
    }
}
</style>
