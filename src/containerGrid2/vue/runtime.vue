<template>
    <div class="layout" :style="m.data.style" @click="onClickLayout">
        <Tree :node="tree" :parentNode="null" @onClickNode="onClickNode" :env="m.env">
            <template #nodeSlots="{ nodes }">
                <template v-for="node in nodes">
                    <slot :name="node.id" :m="{ style: node.layout }"></slot>
                </template>
            </template>
        </Tree>
    </div>
</template>

<script>
import Tree from './tree.vue';

export default {
    components: {
        Tree
    },
    props: ['m'],
    methods: {
        onClickLayout() {
            if (this.m.env?.runtime) {
                this.outputs?.["click_layout"]?.();
            }
        },
        onClickNode(id) {
            if (this.m.env?.runtime) {
                this.outputs?.[`click_node_${id}`]?.();
            }
        }
    },
    computed: {
        tree() {
            console.warn(JSON.parse(JSON.stringify(this.m.data.tree)))
            return this.m.data.tree;
        },
    },
    watch: {
        tree: {
            handler(val) {
                console.warn("treeee", JSON.parse(JSON.stringify(val)))
            },
            deep: true
        }
    }
};
</script>

<style lang="less" scoped>
@import './../style.less';
</style>
