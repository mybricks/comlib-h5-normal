<template>
    <div>
        <div class="tabs">
            <div class="tab_line">
                <div v-for="item in items" :key="item._id" @click="tabClick(item._id)"
                    :class="['tabItem_line',isActive(item._id)]" style="flex-grow: 0;">
                    {{ item.tabName }}
                    <div v-if="item._id === value" class="line taroify-tabs__line"></div>
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
    name: 'Tabs',
    props: {
        value: {
            type: String,
        },
        items: {
            type: String,
        },
    },
    data() {
        return {

        }
    },
    methods: {
        tabClick(id) {
            // emit('change', id)
            this.$emit('change', id)
        },
        isActive(itemId){
            return itemId === this.value ? 'active taroify-tabs__tab--active' : 'taroify-tabs__tab';
        }
    }
}

</script>

<style scoped lang="less">
@import "./index.less";
</style>
