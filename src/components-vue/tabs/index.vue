<template>
    <div>
        <div>
            <div class="tabs">
                <div class="tab_line">
                    <div v-for="item in items" :key="item._id" @click="tabClick(item._id)"
                        :class="['tabItem_line', isActive(item._id) ? 'active taroify-tabs__tab--active' : 'taroify-tabs__tab']">
                        <!-- 激活的情况 -->
                        <div v-show="isActive(item._id)">
                            <div v-show="item.tabPicActive">
                                <img :src="item.tabPicActive" class="tabItem_pic" alt="" />
                            </div>
                            <div v-show="!item.tabPicActive">{{ item.tabName }}</div>
                            <div v-show="item._id === value" class="line taroify-tabs__line"></div>
                        </div>
                        <!-- 非激活的情况 -->
                        <div v-show="!isActive(item._id)">
                            <div v-show="item.tabPic">
                                <img :src="item.tabPic" class="tabItem_pic" alt="" />
                            </div>
                            <div v-show="!item.tabPic">{{ item.tabName }}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>

export default {
    inheritAttrs: true,
    props: ['value', 'items'],
    data() {
        return {

        }
    },
    created() {
        console.log("tabs created", this)
    },
    mounted() {
        console.log("tabs mounted", this)
    },
    methods: {

        tabClick(id) {
            // emit('change', id)
            this.$emit('change', id)
        },
        isActive(itemId) {
            return itemId === this.value ? true : false;
        }
    }
}

</script>

<style scoped lang="less">
@import "./index.less";
</style>
