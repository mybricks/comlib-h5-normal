<template>
    <div :class="css.layout" :style="data.style" @click="onClickLayout">
        <div v-for="child in renderSlot(data.tree, null)" :key="child.id">
            <!-- Content will be rendered using render functions -->
        </div>
    </div>
</template>

<script>
import cx from 'classnames';
import css from './../style.less';

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
                    cssClass: css.node,
                    style: { ...node.style, ...leafSize }
                };
            }

            const nodeCx = cx({
                [css.row]: node.direction === 'row',
                [css.col]: node.direction === 'col',
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

<style scoped>
@import './../style.less';
</style>
