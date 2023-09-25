<template>
    <div class="layout" :style="data.style" @click="onClickLayout">
        <Tree :node="tree" :parentNode="null" @onClickNode="onClickNode" >
            <template #nodeSlots="nodes">
                <template v-for="node in nodes">
                    <slot :name="node.id"></slot>
                </template>
            </template>
        </Tree>
    </div>
</template>

<script>
import cx from 'classnames';
import Tree from './tree.vue';

export default {
    components: {
        Tree
    },
    props: ['id', 'env', 'data', 'outputs', 'slots'],
    methods: {
        onClickLayout() {
            if (this.env?.runtime) {
                this.outputs?.["click_layout"]?.();
            }
        },
        onClickNode(id) {
            if (this.env?.runtime) {
                this.outputs?.[`click_node_${id}`]?.();
            }
        }
    },

    computed: {
        tree() {
            return this.data.tree;
        }
    }
};
</script>

<style lang="less" scoped>
@import './../style.less';
</style>
