<template>
  <div :class="cls" :style="$attrs.style ?? {}">
    <img :class="imgCls" :src="src" />
  </div>
</template>

<script>
import classNames from "classnames";

export default {
  inheritAttrs: true,
  props: ["mode", "src"],
  methods: {},
  computed: {
    cls() {
      const cls = classNames(
        "h5-img",
        {
          "h5-img__widthfix": this.mode === "widthFix",
        },
        this.$attrs.className
      );
      return cls;
    },
    imgCls() {
      const imgCls = classNames(
        "h5-img__mode-" +
          (this.mode || "scaleToFill").toLowerCase().replace(/\s/g, "")
      );
      return imgCls
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
