<template>
    <div :class="css.condition">
        <div v-for="item in data.items" :key="item.id" :class="css.content">
                <div v-if="activeId === item.id">
                    <slot :name="item.id"></slot>
                </div>
        </div>
    </div>
</template>

<script>
import css from "./../style.less";

export default {
    props: ['env', 'data', 'inputs', 'outputs'],
    data() {
        return {
            inputId: null,
            editSelectId: null,  // 新的数据属性
            css
        };
    },
    created() {
        console.log("data.items", this.data.items);
        this.editSelectId = this.data._editSelectId_; // 初始化值
    },
    computed: {
        activeId() {
            console.log("activeId", this.editSelectId);
            if (this.env.edit) {
                return this.data._editSelectId_ || (this.data.items && this.data.items.length ? this.data.items[0].id : null);
            }
            return this.inputId;
        }
    },
    watch: {
        'data._editSelectId_': function (newVal) {
            this.editSelectId = newVal; // 当data._editSelectId_变化时，更新editSelectId
        },
        'data.items': {
            immediate: true,
            handler(val) {
                (val || []).forEach(item => {
                    if (this.inputs[item.id]) {
                        this.inputId = item.id;
                    }
                });
            }
        }
    }
}
</script>
