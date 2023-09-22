<template>
    <div class="richtext" style="height:100%">
        <div 
          v-html="computedContent"
          @click="handleImageTap"
        ></div>
    </div>
</template>

<script>
import { ref, watch, computed } from "vue";

export default {
    name: "RichTextComponent", 
    props: {
        env: Object,
        data: Object,
        inputs: Object,
        outputs: Object,
        slots: Object,
    },
    setup(props) {
        const computedContent = computed(() => {
            let result = decodeURIComponent(props.data.content);
            result = result.replace(/<img.*?(?:>|\/>)/gi, (match) => {
                let matchResult = match.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
                let src = matchResult ? matchResult[1] : "";
                return match.replace(/<img/gi, `<img data-sid="${src}"`);
            });
            result = result.replace(/<img/gi, '<img class style="display: block; width: 100%; height: auto;"');
            return result;
        });

        const handleImageTap = (e) => {
            console.warn(e);

            const imageUrls = computedContent.value.match(/<img.*?src="(.*?)"/g)
                ?.map((item) => item.match(/src="(.*?)"/)[1]) || [];

            if (imageUrls.length === 0) return;


        };

        watch(() => props.data.content, (newContent) => {
            props.inputs["setDataSource"]((val) => {
                props.data.content = val;
            });
        });

        return {
            computedContent,
            handleImageTap,
            richtextClass: "richtext", // 将这个类名放在style里
            taroHtmlClass: "taro_html" // 将这个类名放在style里
        };
    }
};
</script>

<style scoped>
@import "./../style.less";
</style>
