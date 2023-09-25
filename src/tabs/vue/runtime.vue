<template>
    <div v-if="emptyView" :class="css.empty">暂无内容，请配置标签项</div>
    <Tabs v-else :value="currentTabId" :items="data.tabs" @change="setCurrentTabId">
        <template v-for="tab in data.tabs">
            <div v-show="currentTabId === tab._id">
                <div v-show="!data.hideContent">
                    <slot :name="tab._id"></slot>
                </div>
            </div>
        </template>
    </Tabs>
</template>

<script setup>
import { ref, watch, onMounted, computed, onRenderTracked } from 'vue';
import css from '../style.less';
import Tabs from '../../components-vue/tabs/index.vue';

const { data, inputs, outputs, title, env } = defineProps(['data', 'inputs', 'outputs', 'title', 'env']);


const getDefaultCurrTabId = (tabs) => {
    if (tabs.length > 0) {
        return tabs[0]._id || '';
    }
    return '';
};

const currentTabId = ref(getDefaultCurrTabId(data.tabs));

watch(() => [data.initChangeTab, currentTabId.value], () => {
    const index = data.tabs.findIndex(tab => tab._id == currentTabId.value);
    if (index === -1) {
        return;
    }
    const findItem = data.tabs[index];
    outputs.changeTab?.({
        id: findItem._id,
        title: findItem.tabName,
        index,
    });
}, { immediate: true });

const setCurrentTabId = (newTabId) => {
    currentTabId.value = newTabId;
    const index = data.tabs.findIndex(tab => tab._id == newTabId);
    if (index === -1) {
        return;
    }
    const findItem = data.tabs[index];
    outputs.changeTab?.({
        id: findItem._id,
        title: findItem.tabName,
        index,
    });
};

onMounted(() => {
    console.log("mounted id",data.edit.currentTabId)
    inputs['tabList']?.((ds) => {
        if (Array.isArray(ds)) {
            data.tabs = ds;
        }
    });

    inputs['activeTabId']?.((tabId) => {
        if (tabId !== undefined || tabId !== null) {
            setCurrentTabId(tabId);
        }
    });
});

// watch(() => [env.edit, data.edit.currentTabId], () => {
//     if (env.edit && data.edit.currentTabId) {
//         currentTabId.value = data.edit.currentTabId;
//     }
// });


const emptyView = computed(() => env.edit && data.tabs.length === 0);
</script>

<style scoped></style>
