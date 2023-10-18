<template>
    <div class="box">
        <div class="inner_box"></div>
        <div class="coupon">
            <img class="top_icon"
                src="http://my.mybricks.world/mfs/files/1695554977042/bndFS3PMlPyy5ArtfF9Sq334UNFdr5Yb-1695554977205.png" />
            <div class="container">
                <div class="round">
                    <img :src="_dataSource.img" />
                </div>
                <div class="desc">
                    <div class="title">{{ _dataSource.title }}</div>
                    <div class="text">{{ _dataSource.text }}</div>
                </div>
            </div>
        </div>
        <img class="button"
            src="http://my.mybricks.world/mfs/files/1695552202529/Oq2PTHHG6jhrz5ZQ3BGMPllEjWSruaM2-1695552202734.png" />
    </div>
</template>

<script>
export default {
    props: ["m", "inputs"],
    data() {
        return {
            dataSource: {}
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
            if (this.m.env.runtime) {
                return this.dataSource;
            } else {
                return {
                    title: "券信息",
                    text: "使用条件",
                    img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
                }
            }
        }
    }
}

</script>

<style lang="less" scoped>
.box {
    width: 170px;
    height: 130px;
    border-radius: 8px;
    position: relative;
    margin-left: auto;
    margin-right: auto;

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
</style>
