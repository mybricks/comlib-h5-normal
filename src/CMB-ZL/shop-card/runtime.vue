<template>
    <div>
        <ItemCard bgColor="black"
            headerSrc="http://my.mybricks.world/mfs/files/1695623624389/AisY26zJAxvA8xxg87rHNDscyCj1IsDZ-1695623625003.png">
            <div :class="css.shopList">
                <template v-if="hasCard">
                    <template v-for="(item, index) in list">
                        <div :class="css.shopItem" :key="index">
                            <slot name="shop_card" :env="env" :inputs="{
                                install(fn) {
                                    fn(item)
                                }
                            }"></slot>
                        </div>
                    </template>
                </template>
                <template v-else>
                    <div class="emptyCard">
                        <slot name="shop_card" title="请选择"></slot>
                    </div>
                </template>
            </div>
        </ItemCard>
    </div>
</template>

<script>
import css from "./index.less";
import ItemCard from "../components/item-card/index.vue";

export default {
    props: ["data", "slots", "outputs", "env"],
    components: {
        ItemCard,
    },
    data() {
        return {
            css: css,
            list: [{
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥6429',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥305.81起'
            }, {
                title: '【12期免息】苹果Apple iPhone 14 Pro Max',
                price: '￥6429',
                img: 'http://my.mybricks.world/mfs/files/1695624752921/aiPwHdAh7BhYROKafnd5sINyDsBPl8hE-1695624753798.png',
                buttonText: '月供 ￥305.81起'
            }]

        }
    },
    computed: {
        hasCard() {
            return !!this.slots['shop_card']?.size;
        }
    }
};

</script>

<style lang="less"></style>
