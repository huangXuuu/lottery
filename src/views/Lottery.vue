<template>
  <div class="container">
    <div>
      <el-switch v-model="isSinglePrizePattern" size="large" active-text="抽中奖者" inactive-text="抽奖品" />
    </div>
    <div class="filter">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template #title>
            <div class="filter-title">
              <el-icon class="title-icon">
                <shopping-bag />
              </el-icon>
              <span>奖池设置</span>
            </div>
          </template>
          <div class="table">
            <div>※请选中加入奖池的内容</div>
            <el-table
              ref="targetTableRef"
              class="table"
              :data="targetData"
              :border="true"
              :stripe="true"
              @selection-change="handleTargetCheckBoxChange"
            >
              <el-table-column type="selection" width="40" />
              <el-table-column label="类别" width="180" prop="type" sortable></el-table-column>
              <el-table-column :label="getTableLabel('name')" width="180" prop="name" sortable></el-table-column>
              <el-table-column
                v-if="!isSinglePrizePattern"
                label="库存"
                width="180"
                prop="stock"
                sortable
              ></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="prize">
      <div class="prizer">
        <el-button :disabled="!canStart" type="primary" @click="onStartBtnClick">
          <el-icon>
            <pointer />
          </el-icon>
          <span>开始</span>
        </el-button>
        <!-- 转盘抽奖 -->
        <!-- <PrizeLotteryTurntable v-model="dialogVisible" :prizeList="prizeChecked"></PrizeLotteryTurntable> -->
        <!-- 老虎机抽奖 -->
        <PrizeLotterySlotMachine
          v-model="dialogVisible"
          :prizeList="targetPrizeData"
          :option="lotteryOption"
          @afterLottery="afterLottery"
        ></PrizeLotterySlotMachine>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ShoppingBag, Pointer } from '@element-plus/icons-vue';
import { ElTable } from 'element-plus';

import { Target, Prize, LotteryOption } from '@/models';
import { localService } from '@/services/localService';
import { Category } from '@/commons/constants';

/**
 * 抽奖模式
 * false：抽奖品
 * true：抽中奖者
 */
const isSinglePrizePattern = ref(false);

/**
 * 目标选择表格Ref
 */
const targetTableRef = ref<InstanceType<typeof ElTable>>();

/**
 * 抽奖配置
 */
const lotteryOption = computed(() => {
  const option: LotteryOption = {
    round: 6,
    itemHeight: 100,
    showLimitStock: !isSinglePrizePattern.value
  };

  return option;
});

/**
 * 列名取得
 *
 * @param {string} key 列key
 * @returns {string} 列名
 */
const getTableLabel = (key: string): string => {
  if (isSinglePrizePattern.value) {
    switch (key) {
      case 'name':
        return '姓名';
      default:
        return '';
    }
  } else {
    switch (key) {
      case 'name':
        return '奖品名称';
      case 'stock':
        return '库存';
      default:
        return '';
    }
  }
};

/**
 * 设置折叠框的展开项
 */
const activeNames = ref(['1']);

/**
 * 已登录的全部奖品信息
 */
const targetData = computed(() => {
  return isSinglePrizePattern.value ? localService.personInfo : localService.prizeInfo;
});

/**
 * 复选奖品列表
 */
const targetChecked = ref<Target[]>([] as Target[]);

/**
 * 抽奖目标
 */
const targetPrizeData = computed((): Target[] => {
  return targetChecked.value.filter(item => {
    // 奖品
    if (item.category === Category.PRIZE) {
      return (item as Prize).stock > 0;
    }
    // 人员
    else {
      return true;
    }
  });
});

/**
 * 奖品表格复选项变更时处理
 *
 * @param {Target[]} val 奖品
 * @returns {void}
 */
const handleTargetCheckBoxChange = (val: Target[]): void => {
  targetChecked.value = val;
};

/**
 * 基于已选择的内容是否可以开始抽奖
 */
const canStart = computed((): boolean => {
  return targetPrizeData.value.length > 0;
});

/**
 * 抽奖框表示flag
 */
const dialogVisible = ref(false);

/**
 * 开始按钮点击时处理
 *
 * @returns {void}
 */
const onStartBtnClick = (): void => {
  dialogVisible.value = true;
};

/**
 * 一次抽奖后的回调
 *
 * @param {Target} target 抽中的目标
 * @returns {void}
 */
const afterLottery = (target: Target): void => {
  // 奖品
  if (target.category === Category.PRIZE) {
    const prize = target as Prize;
    if (prize.stock !== 0) {
      prize.stock--;
      localService.prizeInfo = targetData.value as Prize[];
    }
  }
  // 人员
  else {
    const index = targetChecked.value.findIndex(item => item.id === target.id);
    targetChecked.value.splice(index, 1);
  }
};

/**
 * 结束抽奖后重置目标列表
 */
watch(dialogVisible, (val: boolean) => {
  if (val) {
    return;
  }

  targetTableRef.value?.clearSelection();
});
</script>

<style scoped lang="scss">
// stylelint-disable-next-line selector-class-pattern
::v-deep(.el-switch__label) {
  font-size: 1.5rem !important;

  * {
    font-size: 1.5rem !important;
  }
}

.container {
  padding: 24px;
}

.table {
  width: 100%;
}

.filter {
  .filter-title {
    margin-left: 12px;

    .title-icon {
      margin-right: 6px;
    }
  }

  .table {
    width: 80%;
    margin: 12px;
  }
}

::v-deep(.current-row) {
  // stylelint-disable-next-line selector-class-pattern
  .el-table__cell {
    background-color: #a5c8fe !important;
  }
}

.prize {
  margin-top: 12px;
  margin-bottom: 36px;
  text-align: center;
}
</style>
