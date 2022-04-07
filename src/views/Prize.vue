<template>
  <div class="container">
    <div class="operation">
      <el-button type="primary" @click="onInsertBtnClick">
        <el-icon>
          <Plus />
        </el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="success" @click="onSaveBtnClick">
        <el-icon>
          <document-checked />
        </el-icon>
        <span>保存</span>
      </el-button>
    </div>
    <el-table class="table" :data="tableData" :border="true" :stripe="true">
      <el-table-column label="类别" width="180" prop="type" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.type" placeholder="请输入类别" />
        </template>
      </el-table-column>
      <el-table-column label="奖项" width="180" prop="name" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.name" placeholder="请输入奖项" />
        </template>
      </el-table-column>
      <el-table-column label="库存" width="180" prop="stock" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.stock" placeholder="请输入库存" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="red"
            title="确认要删除吗？"
            @confirm="onDeleteBtnClick(scope.$index)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Plus, DocumentChecked, InfoFilled } from '@element-plus/icons-vue';

import { Prize } from '@/models';
import { localService } from '@/services/localService';
import { getUUID } from '@/utils/helperUtils';

/**
 * 奖品列表
 */
const tableData: Prize[] = reactive([]);

onMounted(() => {
  initTableData();
});

onUnmounted(() => {
  // 离开前保存数据
  saveTableData();
});

/**
 * 初始化表格数据
 *
 * @returns {void}
 */
const initTableData = (): void => {
  const data = localService.prizeInfo;
  if (data) {
    tableData.splice(0, tableData.length, ...data);
  }
};

/**
 * 追加按钮点击后处理
 *
 * @returns {void}
 */
const onInsertBtnClick = (): void => {
  const prize = {
    id: getUUID(),
    name: '',
    type: '',
    stock: 1
  };

  tableData.push(prize);
};

/**
 * 保存按钮点击后处理
 *
 * @returns {void}
 */
const onSaveBtnClick = (): void => {
  saveTableData();
};

/**
 * 保存表格数据
 *
 * @returns {void}
 */
const saveTableData = (): void => {
  localService.prizeInfo = tableData;
};

/**
 * 删除按钮点击处理
 *
 * @param {number} index 行索引
 * @returns {void}
 */
const onDeleteBtnClick = (index: number): void => {
  tableData.splice(index, 1);
};
</script>

<style scoped>
.container {
  padding: 24px;
}

.table {
  width: 100%;
}

.operation {
  margin-bottom: 12px;
}
</style>
