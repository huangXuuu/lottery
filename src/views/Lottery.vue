<template>
  <div class="container">
    <!-- <div>
      <el-switch
        v-model="isSinglePrizePattern"
        size="large"
        active-text="一个奖品众人抽奖"
        inactive-text="多个奖品单人抽奖"
      />
    </div>-->
    <div class="filter">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template #title>
            <div class="filter-title">
              <el-icon class="title-icon">
                <shopping-bag />
              </el-icon>
              <span>奖品设置</span>
            </div>
          </template>
          <div class="table">
            <div v-if="isSinglePrizePattern">※单击表格数据，选择当前奖品</div>
            <el-table
              class="table"
              :data="prizeData"
              :border="true"
              :stripe="true"
              :highlight-current-row="isSinglePrizePattern"
              @current-change="handlePrizeSelectionChange"
              @selection-change="handlePrizeCheckBoxChange"
            >
              <el-table-column type="selection" width="40" />
              <el-table-column label="类别" width="180" prop="type" sortable></el-table-column>
              <el-table-column label="奖项" width="180" prop="name" sortable></el-table-column>
              <el-table-column label="库存" width="180" prop="stock" sortable></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item v-if="isSinglePrizePattern" name="2">
          <template #title>
            <div class="filter-title">
              <el-icon class="title-icon">
                <avatar />
              </el-icon>
              <span>目标人群设置</span>
            </div>
          </template>
          <div class="table">
            <el-table
              class="table"
              :data="userData"
              :border="true"
              :stripe="true"
              @selection-change="handleUserSelectionChange"
            >
              <el-table-column type="selection" width="40" />
              <el-table-column label="姓名" width="180" prop="name" sortable></el-table-column>
              <el-table-column label="职位" width="180" prop="type" sortable></el-table-column>
              <el-table-column label="头像" width="180">
                <template #default="scope">
                  <el-avatar class="avatar" shape="square" :size="160" fit="cover" :src="scope.row.image" />
                </template>
              </el-table-column>
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
          @afterLottery="afterLottery"
        ></PrizeLotterySlotMachine>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Avatar, ShoppingBag, Pointer } from '@element-plus/icons-vue';

import { Prize, User } from '@/models';
import { localService } from '@/services/localService';

/**
 * 抽奖模式
 * false：多个奖品单人抽奖
 * true：一个奖品众人抽奖
 */
const isSinglePrizePattern = ref(false);

/**
 * 设置折叠框的展开项
 */
const activeNames = ref(['1']);

/**
 * 已登录的全部奖品信息
 */
const prizeData = computed(() => {
  return localService.prizeInfo;
});

/**
 * 单选奖品
 */
const prizeSelection = ref<Prize>({} as Prize);

/**
 * 奖品表格单选项变更时处理
 *
 * @param {Prize} val 奖品
 * @returns {void}
 */
const handlePrizeSelectionChange = (val: Prize): void => {
  prizeSelection.value = val;
};

/**
 * 复选奖品列表
 */
const prizeChecked = ref<Prize[]>([] as Prize[]);

const targetPrizeData = computed(() => {
  return prizeChecked.value.filter(item => item.stock > 0);
});

/**
 * 奖品表格复选项变更时处理
 *
 * @param {Prize[]} val 奖品
 * @returns {void}
 */
const handlePrizeCheckBoxChange = (val: Prize[]): void => {
  prizeChecked.value = val;
};

/**
 * 已登录的全部人员信息
 */
const userData = computed(() => {
  return localService.userInfo;
});

/**
 * 复选人员列表
 */
const userSelection = ref<User[]>([]);

/**
 * 人员表格复选项变更时处理
 *
 * @param {User[]} val 人员
 * @returns {void}
 */
const handleUserSelectionChange = (val: User[]): void => {
  userSelection.value = val;
};

/**
 * 基于已选择的内容是否可以开始抽奖
 */
const canStart = computed((): boolean => {
  if (isSinglePrizePattern.value) {
    return (prizeSelection.value.id && userSelection.value.length > 0) as boolean;
  } else {
    return (prizeChecked.value.length > 0) as boolean;
  }
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

const afterLottery = (prize: Prize): void => {
  if (prize.stock !== 0) {
    prize.stock--;
  }
  localService.prizeInfo = prizeData.value;
};
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
