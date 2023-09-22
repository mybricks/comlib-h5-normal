<template>
    <div>
        <div :class="styles.tabs">
            <div :class="styles.tab_line">
                <div v-for="item in items" :key="item._id" @click="tabClick(item._id)"
                    :class="[styles.tabItem_line, item._id === value ? styles.active : '']" style="flex-grow: 0">
                    {{ item.tabName }}
                    <div v-if="item._id === value" :class="styles.line" style="background-color: #FA6400"></div>
                </div>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import styles from "./index.less";

const props = defineProps({
    value: String,
    items: Array,
    onChange: Function
});

const tabClick = (id) => {
    props.onChange(id);
};
</script>

<style scoped lang="less">

</style>
