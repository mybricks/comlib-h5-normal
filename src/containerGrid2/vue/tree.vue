<template>
  <div v-if="node.isLeaf" class="node" :style="{ ...node.style, ...leafSize }" :key="node.id" @click="onClickNode">
    {{ node.id }}
    <slot :name="node.id" :style="{ background: 'red' }"></slot>
  </div>
  <div v-else :class="nodeCx" :key="node.id">
    <template v-for="child in node.children">
      <Tree :node="child" :parentNode="node" />
    </template>
  </div>
</template>
<script>
import cx from 'classnames';

export default {
  name: 'Tree',
  props: ['node', 'parentNode', 'slots', 'outputs'],
  created() {
    console.log(this.node);
  },
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
    onClickNode() {
      console.error(this.node.id);
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