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
            <el-button class="center-of-prize start" type="danger" @click="resetGame">
              <el-icon><refresh /></el-icon>
              <span>重置</span>
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
</template>

<script setup lang="ts" name="PrizeLotterySlotMachine">
import { PropType } from 'vue';
import { Pointer, Refresh } from '@element-plus/icons-vue';

import { Prize } from '@/models';

const props = defineProps({
  /**
   * 弹框表示flag
   */
  modelValue: Boolean,
  /**
   * 奖品列表
   */
  prizeList: {
    type: Array as PropType<Prize[]>,
    default: () => [] as Prize[]
  }
});

const emit = defineEmits(['update:modelValue']);

const modelValue = toRef(props, 'modelValue');

const dialogVisible = computed({
  get: () => modelValue.value,
  set: value => {
    emit('update:modelValue', value);
  }
});

const currentPrize = ref<Prize>({} as Prize);

const option = ref({
  round: 6,
  itemHeight: 100
});

const itemHeightWithPx = computed(() => {
  return `${option.value.itemHeight}px`;
});

const containerHeight = computed(() => {
  return prizeData.value.length * option.value.round * option.value.itemHeight;
});

const containerHeightWithPx = computed(() => {
  return `${containerHeight.value}px`;
});

/**
 * 奖品列表
 */
const prizeData = toRef(props, 'prizeList');

/**
 * Ref
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
  width: 300px;
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
</style>
