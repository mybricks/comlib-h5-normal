<template>
    <div>
        <div v-if="status === 'LOADING'" class="loading">加载中…</div>
        <div v-if="status === 'ERROR'" class="loading">组件出错</div>
        <div v-if="status === 'SUCCESS'" class="outer_box">
            <div class="title">{{ data.title }}</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;" class="inner_box">
                <div v-for="(item, index) in prizeList" :key="index" class="prize">
                    <div @click="handleDraw" v-if="item.type === 'MAIN_BTN'">
                        <img class="button" :src="data.buttonImg" alt="Main Button" />
                    </div>
                    <div v-else>
                        <img class="button" :src="item.awardDefaultImg" alt="Prize" v-show="viewIndex(activeIndex) !== index" />
                        <img class="button" :src="item.awardOpenedImg" alt="Prize" v-show="viewIndex(activeIndex) === index" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data","outputs"],
    data() {
        return {
            prizeList: [],
            activeIndex: null,
            speed: 70,
            status: 'LOADING',
            timer: null,
            counter: 0,
            clockwiseOrder: [0, 1, 2, 5, 8, 7, 6, 3],
        };
    },
    methods: {
        async getPrizes() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        { id: 1, name: '3张投票机会', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_czd3jj.4811e2a237cc4d56.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_662pwt.1784cbcfc69b0abe.png" },
                        { id: 2, name: '快手小店神秘周边', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_w9w1j8.e31eb743de819bc1.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_n0y4yt.31ea43a3d8b7e8a5.png" },
                        { id: 3, name: '快手小店直播机会', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_8eridn.fed7ce5bd406feb6.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_abk6y1.d78a62186a6e0b0d.png" },
                        { id: 4, name: 'AirPods', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_3i1xp4.ac1b5adac760946d.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_1d513a.4ce33a4720c7d146.png" },
                        { id: 'main_btn', name: 'Draw', type: 'MAIN_BTN', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_yh620n.5a11e1ac7437cfc9.png" },
                        { id: 5, name: '戴森吸尘器', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_bmx46c.755afc52668765a0.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_bm8580.6601535c1558ad91.png" },
                        { id: 6, name: '小金牛手链', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_d449jm.57fab82e6ad3c7f5.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_p7383y.064c2b0d8e7a152d.png" },
                        { id: 7, name: '钻戒', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_2bizfp.bcc39e6da53e9030.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_i1y7mz.1249e441ed58cf77.png" },
                        { id: 8, name: '谢谢参与', type: 'PRIZE', awardDefaultImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_d0styi.30bac1bafcda9622.png", awardOpenedImg: "https://ali2.a.kwimgs.com/kos/nlav11092/u_dam47a.82dea0072e0ba8c6.png" }
                    ]);
                }, 500);
            });
        },
        startTimer(targetPrizeId) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            const additionalSteps = 3; // 延迟圈数
            let stepsAfterWinning = 0;
            this.timer = setInterval(() => {
                this.activeIndex = this.clockwiseOrder[this.counter % 8];
                const currentPrize = this.prizeList[this.activeIndex];
                if (currentPrize.id === targetPrizeId.id) {
                    stepsAfterWinning++;
                }
                if (stepsAfterWinning >= additionalSteps) {
                    clearInterval(this.timer);
                    // alert(`你赢得了${currentPrize.name}！`);
                    let result = {
                        prizeId: currentPrize.id,
                        prizeName: currentPrize.name,
                        prizeImg: currentPrize.awardOpenedImg
                    }
                    this.outputs["priceResult"](result)
                    this.timer = null
                    this.activeIndex = null;
                }
                this.counter++;
            }, this.speed);
        },
        async handleDraw() {
            if (this.timer) return;
            const targetPrizeId = await this.fetchPrizeFromBackend();
            this.startTimer(targetPrizeId);
        },
        async fetchPrizeFromBackend() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.prizeList[7]);
                }, 300);
            });
        },
        //vue页面渲染的id比预期左偏一位，需要向右一位纠正
        viewIndex(activeIndex) {
            if(activeIndex === null) return null
            const i = this.clockwiseOrder.indexOf(activeIndex);
            const nextIndex = (i + 1) % this.clockwiseOrder.length;
            return this.clockwiseOrder[nextIndex];
        }
    },
    mounted() {
        this.getPrizes()
            .then((list) => {
                this.prizeList = list;
                this.status = 'SUCCESS';
            })
            .catch(() => {
                this.status = 'ERROR';
            });
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
};
</script>

<style scoped>
.loading{
    background-color: #EACCCC;
    width: 100%;
    height: 400px;
    font-size: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
.inner_box {
    background-color: #d9221f;
    width: 95%;
    margin: 0 auto;
    border-radius: 8px;
    padding: 10px;
}

.outer_box {
    background-color: #EACCCC;
    padding-bottom: 10px;
}

.title {
    margin: 0 auto;
    font-weight: bold;
    color: white;
    width: 70%;
    background-color: #D05D58;
    font-size: 15px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 7px;
    margin-bottom: 13px;
    border-radius: 50px;
    font-weight: bold;
}

.active {
    background-color: yellow;
    transition: background-color 0.5s;
}

.button {
    width: 105px;
    height: 105px;
}
</style>
