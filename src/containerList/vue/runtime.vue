<template>
  <div :class="listCx">
    <div class="inner">
      <div class="item" :style="itemStyle" v-for="(item, index) in _list" :key="index">
        <slot name="item" :inputValues="{
          itemData: item,
          index: index
        }"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["m"],
  data() {
    return {
      list: []
    }
  },
  created() {
    this.m.inputs.setDatasource?.((value) => {
      this.list = value;
    });

  },
  computed: {
    listCx() {
      return {
        list: true,
        "mybricks-list": true,
        "grid": this.m.data.layout === "grid",
        "horizontal": this.m.data.layout === "horizontal",
      }
    },
    itemStyle() {
      if (this.m.data.layout === "grid") {
        let column = this.m.data.column;
        return {
          maxWidth: `${100 / column}%`,
          flexBasis: `${100 / column}%`,
          paddingRight: `12px`,
          background: "red",
        }
      }
    },
    _list() {
      // 编辑态时，渲染3个空白容器
      if (this.m.env.edit) {
        return new Array(3);
      }
      return this.list;
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  height: 100%;

  &.grid {
    .inner {
      display: flex;
      flex-wrap: wrap;
      margin-right: -12px;
      overflow: hidden;
    }
  }

  &.horizontal {
    .inner {
      display: flex;
      flex-direction: row;
    }
  }

  .item {
    width: 100%;
    height: 100%;
  }
}
</style>
