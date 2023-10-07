<template>
    <div v-if="!m.data.asHotarea" class="button" @click="onClick" @dblClick="onDoubleClick">{{ m.data.text }}</div>
    <div v-else :class="hotareaCx" @click="onClick" @dblClick="onDoubleClick"></div>
  </template>
  <script>
  
  export default {
    /**
     * 渲染引擎会传入一个 M 或 m 对象，包含的属性有：
     * 
     * id: 组件实例化后的 uuid
     * title: 组件实例化后的标题
     * style: 组件实例化后的基本尺寸、边距等样式
     * data: 组件实例化后的 data.json 中的数据，支持双向绑定
     * inputs: 组件实例化后的输入项
     * outputs: 组件实例化后的输出项
     * slots: 组件实例化后的插槽项
     * _env: 渲染引擎内置的其他扩展能力
     * env: 渲染引擎自定义注入的其他扩展能力
    */
    props: ["m"], 
    created() {
      // 监听输入事件
      this.m.inputs['setText']((value) => {
        this.m.data.text = value;
      });
    },
    computed: {
      hotareaCx() {
        return {
          'hotarea': true,
          'edit': !!this.m.env.edit // 编辑态下显示热区
        }
      }
    },
    methods: {
      onClick() {
        if (this.m.env.runtime) { // 运行态下才触发输出
          this.m.outputs['click'](this.m.data.text);
        }
      },
      onDoubleClick() {
        if (this.m.env.runtime) {
          this.m.outputs['dblClick'](this.m.data.text);
        }
      }
    }
  }
  
  </script>
  <style lang="less" scoped>
  @import './runtime.less';
  </style>
  
