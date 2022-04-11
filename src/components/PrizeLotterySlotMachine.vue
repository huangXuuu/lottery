<!--
 * 组件名：老虎机抽奖
 *
 * author： 黄旭
 -->
<template>
  <div class="prize-lottery">
    <el-dialog v-model="dialogVisible" :fullscreen="true">
      <div class="prize-body">
        <div>
          <div class="handler">
            <el-button class="center-of-prize start" type="danger" @click="onStartBtnClick">
              <el-icon>
                <pointer />
              </el-icon>
              <span>开始</span>
            </el-button>
          </div>
          <div class="box">
            <div ref="prizeContainer" class="container">
              <ul class="prize-group animation-ease" v-for="i in option.round + 1" :key="i">
                <li class="item" v-for="item in prizeData" :key="item.id">{{ item.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
  <div class="result">
    <el-dialog v-model="resultVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="prize-name">{{ currentPrize.name }}!!!</div>
      <div v-if="option.showLimitStock" class="prize-name">还剩{{ currentPrize.stock }}件</div>
      <template #footer>
        <el-button class="center-of-prize start" type="danger" @click="onRestartBtnClick">
          <el-icon>
            <pointer />
          </el-icon>
          <span>再来一次</span>
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="PrizeLotterySlotMachine">
import { PropType } from 'vue';
import { Pointer } from '@element-plus/icons-vue';

import { Target, LotteryOption } from '@/models';

const props = defineProps({
  /**
   * 弹框表示flag
   */
  modelValue: Boolean,
  /**
   * 奖品列表
   */
  prizeList: {
    type: Array as PropType<Target[]>,
    default: () => [] as Target[]
  },
  /**
   * 抽奖配置
   */
  option: {
    type: Object as PropType<LotteryOption>,
    default: () => {
      return {
        round: 6,
        itemHeight: 100,
        showLimitStock: true
      };
    }
  }
});

/**
 * update:modelValue 双向绑定值
 * afterLottery：抽奖结束后回调
 */
const emit = defineEmits(['update:modelValue', 'afterLottery']);

const modelValue = toRef(props, 'modelValue');

const dialogVisible = computed({
  get: () => modelValue.value,
  set: value => {
    emit('update:modelValue', value);
  }
});

/**
 * 记录本次抽中的奖品
 */
const currentPrize = ref<Target>({} as Target);

/**
 * 抽奖配置
 */
const option = toRef(props, 'option');

/**
 * 奖品高度（单位px）css用
 */
const itemHeightWithPx = computed(() => {
  return `${option.value.itemHeight}px`;
});

/**
 * 奖品容器高度
 */
const containerHeight = computed(() => {
  return prizeData.value.length * option.value.round * option.value.itemHeight;
});

/**
 * 奖品容器高度（单位px）css用
 */
const containerHeightWithPx = computed(() => {
  return `${containerHeight.value}px`;
});

/**
 * 奖品列表
 */
const prizeData = toRef(props, 'prizeList');

/**
 * 奖品容器Ref
 */
const prizeContainer = ref<HTMLUListElement>();

/**
 * 开始按钮点击时处理
 *
 * @returns {void}
 */
const onStartBtnClick = (): void => {
  let index = parseInt((Math.random() * prizeData.value.length).toString());
  currentPrize.value = prizeData.value[index];
  startGame(index);
  showResult();
};

/**
 * 开始抽奖
 *
 * @param {number} index 奖品索引
 * @returns {void}
 */
const startGame = (index: number): void => {
  if (!prizeContainer.value || !prizeContainer.value.children || prizeContainer.value.children.length === 0) {
    return;
  }

  const length = prizeContainer.value.children.length;
  for (let i = 0; i < length; i++) {
    const pos = index * option.value.itemHeight + containerHeight.value;
    const target = prizeContainer.value.children.item(i) as HTMLElement;
    target.classList.add('animation-ease');
    target.style.transform = `translateY(${-pos}px)`;
  }
};

/**
 * 重置游戏
 *
 * @returns {void}
 */
const resetGame = (): void => {
  if (!prizeContainer.value || !prizeContainer.value.children || prizeContainer.value.children.length === 0) {
    return;
  }

  const length = prizeContainer.value.children.length;
  for (let i = 0; i < length; i++) {
    const target = prizeContainer.value.children.item(i) as HTMLElement;
    target.classList.remove('animation-ease');
    target.style.transform = `translateY(0px)`;
  }
};

/**
 * 抽奖结果弹框显示flag
 */
const resultVisible = ref(false);

/**
 * 抽奖结果弹框显示
 *
 * @returns {void}
 */
const showResult = (): void => {
  setTimeout(() => {
    resultVisible.value = true;
    emit('afterLottery', currentPrize.value);
  }, 3500);
};

/**
 * 再来一次按钮点击时处理
 *
 * @returns {void}
 */
const onRestartBtnClick = (): void => {
  resultVisible.value = false;
  resetGame();
};
</script>

<style scoped lang="scss">
.prize-lottery {
  overflow: hidden;

  ::v-deep(.el-dialog) {
    overflow: hidden;
    background-image: url('/images/lotteryBackground.jpeg');
    background-size: 100% 100%;
  }

  // stylelint-disable-next-line selector-class-pattern
  ::v-deep(.el-dialog__body) {
    width: 100%;
    height: 100%;
  }

  .handler {
    margin-bottom: 10px;
  }

  .prize-body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
  }
}

.box {
  width: 40vw;
  min-width: 300px;
  max-width: 600px;
  // stylelint-disable-next-line value-keyword-case
  height: v-bind(itemHeightWithPx);
  margin: auto;
  overflow: hidden;
  background: #fff;

  .animation-ease {
    transition-timing-function: ease;
    transition-duration: 3s;
    transition-property: transform;
  }

  .container {
    width: 100%;
    // stylelint-disable-next-line value-keyword-case
    height: v-bind(containerHeightWithPx);

    .prize-group {
      padding-left: 0;
      margin: 0;
      text-align: center;
      list-style: none;

      :nth-child(2n) {
        background-color: #ffb737;
      }

      :nth-child(2n - 1) {
        background-color: #feca4e;
      }

      .item {
        width: 100%;
        // stylelint-disable-next-line value-keyword-case
        height: v-bind(itemHeightWithPx);
        font-size: 50px;
        line-height: 2;
        -webkit-text-fill-color: #d7625c;
        -webkit-text-stroke: 1.2px #6c4c4c;
      }
    }
  }
}

.result {
  ::v-deep(.el-dialog) {
    width: 650px;
    height: 650px;
    overflow: hidden;
    background-image: url('/images/result.jpg');
    background-size: 100% 100%;
  }

  // stylelint-disable-next-line selector-class-pattern
  ::v-deep(.el-dialog__body) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 80%;
    padding: 0;
  }

  .prize-name {
    font-size: 80px;
    -webkit-text-fill-color: #fab0b0;
    -webkit-text-stroke: 3px #b29642;
  }

  // stylelint-disable-next-line selector-class-pattern
  ::v-deep(.el-dialog__footer) {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
