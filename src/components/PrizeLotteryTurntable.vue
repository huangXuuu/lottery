<!--
 * 组件名：转盘抽奖
 *
 * author： 黄旭
 -->
<template>
  <div class="prize-lottery">
    <el-dialog v-model="dialogVisible" :fullscreen="true">
      <div class="Prizer">
        <el-button class="center-of-prize start" type="danger" @click="onStartBtnClick">
          <el-icon>
            <pointer />
          </el-icon>
          <span>开始</span>
        </el-button>
        <ul ref="prizeContainer" class="container">
          <li class="item" v-for="item in prizeData" :key="item.id">
            <div class="prize-name">{{ item.name }}</div>
          </li>
        </ul>
        <img class="center-of-prize point-img" src="images/point.png" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="PrizeLotteryTurntable">
import { PropType } from 'vue';
import { Pointer } from '@element-plus/icons-vue';

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

/**
 * 奖品列表
 */
const prizeData = toRef(props, 'prizeList');

/**
 * Ref
 */
const prizeContainer = ref<HTMLUListElement>();

/**
 * 弹框打开后，设置奖品的位置
 */
watch(
  modelValue,
  () => {
    nextTick(() => {
      const length = prizeData.value.length;
      const children = prizeContainer.value?.children;
      for (let i = 0; i < length; i++) {
        const t = i * (360 / length) + 'deg';
        if (!children) {
          return;
        }

        const target = children[i] as HTMLElement;
        if (!target) {
          return;
        }

        target.style.transform = `rotate(${t}) translate(360px)`;
      }
    });
  },
  {
    immediate: true,
    deep: true
  }
);

/**
 * 历史偏转角度
 */
let deg = 0;

/**
 * 开始按钮点击时处理
 *
 * @returns {void}
 */
const onStartBtnClick = (): void => {
  deg += fun() * 3;
  if (!prizeContainer.value) {
    return;
  }
  prizeContainer.value.style.transitionDuration = '3s';
  prizeContainer.value.style.transform = `rotateZ(${deg}deg)`;
};

/**
 * 取得随机偏转角度
 *
 * @returns {number} 偏转角度
 */
const fun = (): number => {
  const length = prizeData.value.length;
  var num = Math.round(Math.random() * length);
  return num * (360 / length) + 180;
};
</script>

<style scoped lang="scss">
.prize-lottery {
  ::v-deep(.el-dialog) {
    background-image: url('/images/lotteryBackground.jpeg');
    background-size: 100% 100%;
  }
}

.container {
  position: absolute;
  top: -150px;
  left: -300px;
  width: 1000px;
  height: 1000px;
  list-style: none;
  background: radial-gradient(#eabdbd, #fb641a);
  border-radius: 50%;
  box-shadow: 0 0 20px #ff6363;

  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 30px;
    font-size: 16px;
    text-align: center;
    transform-origin: left top;
  }
}

.center-of-prize {
  position: absolute;
  top: 345px;
  left: 220px;
}

.point-img {
  width: 360px;
  height: 40px;
}

.start {
  z-index: 2;
}
</style>
