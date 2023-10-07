<template>
    <div class="condition">
        <div v-for="item in data.items" :key="item.id" class="content">
            <div v-show="activeId() === item.id">
                <slot :name="item.id"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['env', 'data', 'inputs', 'outputs'],
    data() {
        return {

        };
    },
    created() {
    },
    methods: {
        activeId() {
            return this.data._editSelectId_ || (this.data.items && this.data.items.length ? this.data.items[0].id : null);
        },
    }
}

</script>

<style scoped lang="less">
@import "./../style.less";
</style>
