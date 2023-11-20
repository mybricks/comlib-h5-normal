<template>
  <div class="ninebox" :style="{ background: `url(${m.data.bgSrc}) no-repeat center center / cover` }">
    <div class="entry">
      <div v-for="(item, index) in list" :key="index" class="item">
        <template v-if="index === 4">
          <div @click="spin">
            <img class="mybricks-spin-button spin-button" :src="m.data.drawBtnSrc" />
          </div>
        </template>
        <template v-else>
          <div :class="['coupon', convertIndex(spinIndex) === index ? 'active' : '']">
            <img class="mybricks-coupon-thumbnail thumbnail" :src="item.awardSrc" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

const SPIN_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];

export default {
  props: ["m"],
  data() {
    return {
      couponList: this.m.data.couponList,

      spinSpeed: 70,
      additionalSteps: 8 * 3,

      spinTimer: null,
      spinning: false,
      spinIndex: this.m.env.runtime ? null : 0,

    };
  },
  computed: {
    list() {
      let result = [...this.couponList];
      result.splice(4, 0, this.m.data.drawBtnSrc);
      return result;
    }
  },
  beforeDestroy() {
    if (this.spinTimer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    spin() {
      // 判断组件是否在 runtime 环境下运行
      if (!this.m.env.runtime) {
        return;
      }

      if (this.spinning) {
        console.log("正在抽奖中，不可重复点击");
        return;
      }
      this.spinning = true;

      // 接口请求之前开始空转
      this.startSpin({
        speed: this.spinSpeed,
      });

      // mock 抽奖结果
      this.mockResult(this.m.data.activityCode).then(res => {

        switch (true) {
          case !!res.awardId:
            let couponIndex = this.couponList.findIndex(item => item.awardId === res.awardId);
            let spinIndex = this.couponIndex2SpinIndex(couponIndex);
            this.stopSpin({ index: spinIndex });
            break;

          case res.code === 1001:
            clearInterval(this.spinTimer);
            this.spinning = false;
            this.spinIndex = null;
            alert('您已经抽过奖了')
            break;

          case res.code === 1002:
            clearInterval(this.spinTimer);
            this.spinning = false;
            this.spinIndex = null;
            alert('活动已结束')
            break;
        }

      });
    },
    startSpin({ speed }) {
      this.spinTimer = setInterval(() => {
        this.spinIndex = (this.spinIndex + 1) % SPIN_ORDER.length;
      }, speed);
    },
    stopSpin({ index }) {
      console.log("出结果了，停止抽奖", index);
      clearInterval(this.spinTimer);

      let step = 0;

      this.spinTimer = setInterval(() => {
        this.spinIndex = (this.spinIndex + 1) % SPIN_ORDER.length;
        step++;
        if (step >= this.additionalSteps && this.spinIndex === index) {
          clearInterval(this.spinTimer);
          this.spinning = false;
          console.log("抽奖结束");

          let couponIndex = this.spinIndex2CouponIndex(this.spinIndex);
          let coupon = this.couponList[couponIndex];

          this.m.outputs.result({
            ...coupon,
          });
        }
      }, this.spinSpeed);

    },
    mockResult(activityCode) {
      return new Promise((resolve) => {
        console.log("随机返回抽奖结果");
        setTimeout(() => {
          resolve({
            code: 0,
            awardId: "code5",
          });
        }, 1000);
      });
    },
    couponIndex2SpinIndex(couponIndex) {
      let spinValue;
      if (couponIndex <= 3) {
        spinValue = couponIndex;
      } else {
        spinValue = couponIndex + 1;
      }

      return SPIN_ORDER.indexOf(spinValue);
    },
    spinIndex2CouponIndex(spinIndex) {
      let spinValue = SPIN_ORDER[spinIndex];
      let couponIndex;
      if (spinValue <= 3) {
        couponIndex = spinValue;
      } else {
        couponIndex = spinValue - 1;
      }
      return couponIndex;
    },
    convertIndex(spinIndex) {
      if (spinIndex === null) {
        return null;
      }
      return SPIN_ORDER[spinIndex];
    },
  },
};
</script>

<style lang="less" scoped>
.ninebox {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.entry {
  display: flex;
  flex-wrap: wrap;
  width: 330px;
  height: 330px;
  margin-top: 8px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  padding: 3px;
}


.spin-button {
  width: 100%;
  height: 100%;
}


.coupon {
  &.active {
    background: #ffffff;
    border-radius: 3px;
  }

  .thumbnail {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
