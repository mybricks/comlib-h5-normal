<template>
    <div class="layout" :style="data.style" @click="onClickLayout">
        <div v-for="child in renderSlot(data.tree, null)" :key="child.id" :class="child.cssClass">
            <!-- Content will be rendered using render functions -->
        </div>
    </div>
</template>

<script>
import cx from 'classnames';

export default {
    props: ['id', 'data', 'outputs', 'slots'],

    methods: {
        onClickNode(node) {
            console.log('`click_node_${node.id}`', node, `click_node_${node.id}`);
            if (this.outputs && this.outputs[`click_node_${node.id}`]) {
                this.outputs[`click_node_${node.id}`]();
            }
        },

        onClickLayout() {
            if (this.outputs && this.outputs["click_layout"]) {
                this.outputs["click_layout"]();
            }
        },

        renderSlot(node, parentNode) {
            if (node.isLeaf) {
                let leafSize = {};
                // ... (rest of the code as in React, but converted to Vue syntax)
                return {
                    ...node,
                    cssClass: 'node',
                    style: { ...node.style, ...leafSize }
                };
            }

            const nodeCx = cx({
                ['row']: node.direction === 'row',
                ['col']: node.direction === 'col',
            });

            // ... (rest of the code as in React, but converted to Vue syntax)

            return {
                ...node,
                cssClass: nodeCx,
                children: node.children.map(child => this.renderSlot(child, node))
            };
        }
    },

    computed: {
        tree() {
            return this.renderSlot(this.data.tree, null);
        }
    }
};
</script>

<style lang="less" scoped>
@import './../style.less';
</style>
