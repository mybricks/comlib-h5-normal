<template>
  <div v-if="node.isLeaf" data-leaf class="node" :style="{ ...node.style, ...leafSize }" :key="node.id" :data-id="node.id" @click="() => clickNode(node.id)">
    <slot name="nodeSlots" v-bind="[node]"></slot>
  </div>
  <div v-else-if="Array.isArray(node.children)" :class="nodeCx" :key="node.id" :data-id="node.id">
    <template v-for="child in node.children">
      <Tree v-if="child" :node="child" :parentNode="node" :key="child.id" @onClickNode="treeClick">
        <template #nodeSlots="nodes">
          <slot name="nodeSlots" v-bind="nodes"></slot>
        </template>
      </Tree>
    </template>
  </div>
</template>
<script>
import cx from 'classnames';

export default {
  name: 'Tree',
  props: ['node', 'parentNode'],
  computed: {
    leafSize() {
      let result = {};

      if (!this.parentNode) {
        result.width = "100%";
        result.height = "100%";
      } else {
        if (this.parentNode.direction === "row") {
          if (this.node.size.fixedWidth) {
            result.width = this.node.size.width;
          } else {
            result.flex = 1;
          }

          if (this.node.size.fixedHeight) {
            result.height = this.node.size.height;
          } else {
            result.height = "100%";
          }
        }

        if (this.parentNode.direction === "col") {
          if (this.node.size.fixedHeight) {
            result.height = this.node.size.height;
          } else {
            result.flex = 1;
          }

          if (this.node.size.fixedWidth) {
            result.width = this.node.size.width;
          } else {
            result.width = "100%";
          }
        }
      }

      return result;
    },
    nodeCx() {
      return cx({
        ['row']: this.node.direction === 'row',
        ['col']: this.node.direction === 'col',
      });
    }
  },
  methods: {
    clickNode(id) {
      this.$emit('onClickNode', id)
    },
    treeClick(id) {
      this.$emit('onClickNode', id)
    }
  }
}
</script>

<style lang="less" scoped>
.row {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.col {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>