<template>
    <div :class="safeAreaCx"></div>
</template>

<script>
import { ref, watch, computed } from "vue";

export default {
    props: ["env", "data", "inputs", "outputs"],
    setup(props) {

        const safeAreaCx = computed(() => {
            return {
                'safeArea': true,
                'safeAreaTop': props.data.position === 'top',
                'safeAreaBottom': props.data.position === 'bottom',
                'edit': props.env.edit
            };
        });

        return {
            safeAreaCx
        };
    },
};
</script>

<style scoped>
.safeArea {
  width: 100%;
}

.safeArea.safeAreaTop {
  /* 兼容 iOS < 11.2 */
  height: constant(safe-area-inset-top);
  /* 兼容 iOS >= 11.2 */
  height: env(safe-area-inset-top);
}

.safeArea.safeAreaBottom {
  /* 兼容 iOS < 11.2 */
  height: constant(safe-area-inset-bottom);
  /* 兼容 iOS >= 11.2 */
  height: env(safe-area-inset-bottom);
}

.safeArea.edit.safeAreaTop {
  height: 44px;
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    content: "顶部安全距离";
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.1);
  }
}

.safeArea.edit.safeAreaBottom {
  height: 44px;
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    content: "底部安全距离";
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.1);
  }
}
</style>
