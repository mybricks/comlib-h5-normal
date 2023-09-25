<template>
    <div class="richText">
        <div v-html="content"></div>
    </div>
</template>

<script>
export default {
    props: ["env", "data", "inputs", "outputs"],
    computed: {
        content() {
            let result = decodeURIComponent(this.data.content);
            return result;
        },

    },
    created() {
        this.inputs["setDataSource"]?.((val) => {
            this.data.content = val;
        });
    },
};
</script>

<style lang="less">
// skin
.html {
    color: #666666;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;

    :global {
        h1 {
            color: #222222;
            font-size: 28px;
            font-weight: 600;
            line-height: 1.4;
            margin: 12px 0;
            text-align: center;
        }

        h2 {
            color: #252525;
            font-size: 24px;
            font-weight: 500;
            margin: 8px 0;
        }

        h3 {
            color: #252525;
            font-size: 20px;
            font-weight: 500;
            margin: 6px 0;
        }

        h4 {
            color: #252525;
            font-size: 18px;
            font-weight: 500;
            margin: 4px 0;
        }

        h5 {
            color: #666666;
            font-size: 18px;
            font-weight: 400;
            margin: 4px 0;
        }

        p {
            color: #666666;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.6;
            margin: 4px 0;
        }

        ul {
            display: block;
            list-style-type: disc;
            padding-inline-start: 20px;
            margin: 4px 0;
        }

        ol {
            display: block;
            list-style-type: decimal;
            padding-inline-start: 20px;
            margin: 4px 0;
        }

        li {
            display: list-item;
        }

        img {
            max-width: 100%;
            height: auto !important;
        }
    }
}
</style>

<style lang="less" scoped>
.richText {
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
