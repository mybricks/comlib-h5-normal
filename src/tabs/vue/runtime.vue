<template>
    <div>
        <div v-if="emptyView" class="empty">暂无内容，请配置标签项</div>
        <Tabs v-else :value="currentTabId" :items="m.data.tabs" @change="setCurrentTabId">
            <div v-for="tab in m.data.tabs">
                <div v-show="currentTabId === tab._id">
                    <div v-show="!m.data.hideContent">
                        <slot :name="tab._id"></slot>
                    </div>
                </div>
            </div>
        </Tabs>
    </div>
</template>

<script>
import Tabs from './../../components-vue/tabs/index.vue';

export default {
    props: ['data', 'inputs', 'outputs', 'env', 'title','m'],
    components: {
        Tabs
    },
    data() {
        return {
            currentTabId: 'tabName1',
        }
    },
    computed: {
        emptyView() {
            return this.env.edit && this.data.tabs.length === 0
        }
    },
    watch: {
        'data.initChangeTab': {
            handler: 'handleTabChange',
            immediate: true
        },
        currentTabId: {
            handler: 'handleTabChange',
            immediate: true
        }
    },
    created() {
        this.currentTabId = this.getDefaultCurrTabId(this.data.tabs);
        console.log("this", this)
    },
    mounted() {
        console.log("mounted id", this.currentTabId)
        this.inputs['tabList']?.((ds) => {
            if (Array.isArray(ds)) {
                this.data.tabs = ds;
            }
        });

        this.inputs['activeTabId']?.((tabId) => {
            if (tabId !== undefined || tabId !== null) {
                this.setCurrentTabId(tabId);
            }
        });

    },
    methods: {
        getDefaultCurrTabId(tabs) {
            if (tabs.length > 0) {
                return tabs[0]._id || '';
            }
            return '';
        },
        setCurrentTabId(newTabId) {
            console.log("点击了tab", newTabId)
            this.currentTabId = newTabId;
            const index = this.data.tabs.findIndex(tab => tab._id == newTabId);
            if (index === -1) {
                return;
            }
            const findItem = this.data.tabs[index];
            this.outputs.changeTab?.({
                id: findItem._id,
                title: findItem.tabName,
                index,
            });
        },
        handleTabChange() {
            const index = this.data.tabs.findIndex(tab => tab._id == this.currentTabId);
            if (index === -1) {
                return;
            }
            const findItem = this.data.tabs[index];
            if (this.outputs.changeTab) {
                this.outputs.changeTab({
                    id: findItem._id,
                    title: findItem.tabName,
                    index
                });

            }

        }
    }
}


// watch(() => [data.initChangeTab, currentTabId.value], () => {
//     const index = data.tabs.findIndex(tab => tab._id == currentTabId.value);
//     if (index === -1) {
//         return;
//     }
//     const findItem = data.tabs[index];
//     outputs.changeTab?.({
//         id: findItem._id,
//         title: findItem.tabName,
//         index,
//     });
// }, { immediate: true });


// watch(() => [env.edit, data.edit.currentTabId], () => {
//     if (env.edit && data.edit.currentTabId) {
//         currentTabId.value = data.edit.currentTabId;
//     }
// });



</script>

<style scoped lang="less">
@import "./../style.less";
</style>
