<template>
    <div class="couponList mybricks-couponList">
        <template v-if="hasCard">
            <template v-for="(item, index) in list">
                <div class="item" :key="index">
                    <slot name="card" :inputs="{
                        install(fn) {
                            fn({
                                dataSource: item,
                                m: m,
                                fetch: fetch
                            })
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
    props: ["m"],
    data() {
        return {
            list: [{
                title: '满20元使用',
                text: '3期及以上享用',
                img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
            }, {
                title: '满50元使用',
                text: '6期及以上享用',
                img: 'http://my.mybricks.world/mfs/files/1695558631680/M42d54ywDW41zjSOmUGJw6dbzzidO3oU-1695558631865.png'
            }]
        }
    },
    created() {
    },
    computed: {
        hasCard() {
            return !!this.m.slots?.['card']?.size;
        }
    },
    methods: {
        fetch(params) {
            if (this.m.data.useAfterFetch) {
                this.m.outputs['afterFetch'](params);
            } else {
                alert(`mock 调用领券接口，参数：${JSON.stringify(params)}`);
            }
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
        width: 100%;
        height: 90px;
    }

    .item {
        width: 100%;
        height: 100%;
    }
}
</style>
