<template>
    <div class="footer">
        <div class="main">
            <img class="logo mybricks-logo" :src="data.logo" />
            <div class="dividing"></div>
            <div class="title mybricks-title">{{ data.title }}</div>
        </div>
        <div class="tips mybricks-tips">
            <div class="text">{{ data.tips }}</div>
        </div>

    </div>
</template>

<script>
export default {
    props: ["data"],
}
</script>

<style lang="less" scoped>
.footer {
    .main {
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
            display: block;
            height: 42px;
            width: auto;
        }

        .dividing {
            width: 1px;
            height: 16px;
            background: rgba(255, 255, 255, 0.3);
            margin-left: 18px;
            margin-right: 18px;
        }

        .title {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
        }
    }

    .tips {
        margin-left: auto;
        margin-right: auto;
        margin-top: 18px;
        width: 351px;
        background: rgba(255, 255, 255, 0.3);
        color: #ffffff;
        font-size: 14px;
        padding: 14px;
        border-radius: 99px;
        text-align: center;

        .text {
            display: inline-block;
            text-align: left;
        }
    }
}
</style>
