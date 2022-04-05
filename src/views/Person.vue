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
      <el-table-column label="姓名" width="180" prop="name" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.name" placeholder="请输入姓名" />
        </template>
      </el-table-column>
      <el-table-column label="职位" width="180" prop="type" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.type" placeholder="请输入职位" />
        </template>
      </el-table-column>
      <el-table-column label="头像" width="180">
        <template #default="scope">
          <el-avatar
            class="avatar"
            shape="square"
            :size="160"
            fit="cover"
            :src="scope.row.image"
            @click="onAvatarClick(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column label="中奖次数" width="130" sortable>
        <template #default="scope">
          <el-tag>{{ scope.row.prizeCounts }}</el-tag>
        </template>
      </el-table-column> -->
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

    <cropper
      v-if="isCropperShow"
      v-model="isCropperShow"
      :cropperImg="getCurrentImg()"
      @imageUploaded="onImageUploaded"
    ></cropper>
  </div>
</template>

<script lang="ts" setup>
import { Plus, DocumentChecked, InfoFilled } from '@element-plus/icons-vue';

import { User } from '@/models';
import { localService } from '@/services/localService';
import { getUUID } from '@/utils/helperUtils';

const isCropperShow = ref(false);

/**
 * 当前选择人员
 */
let currentUser = {} as User;

/**
 * 人员列表
 */
const tableData: User[] = reactive([]);

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
  const data = localService.userInfo;
  if (data) {
    tableData.splice(0, tableData.length, ...data);
  }
};

/**
 * 头像点击时的处理
 *
 * @param {User} data 当前点击的数据
 * @returns {void}
 */
const onAvatarClick = (data: User): void => {
  isCropperShow.value = true;
  currentUser = data;
};

/**
 * 当前选择数据的图片
 *
 * @returns {string} 图片
 */
const getCurrentImg = (): string => {
  return currentUser.image;
};

/**
 * 追加按钮点击后处理
 *
 * @returns {void}
 */
const onInsertBtnClick = (): void => {
  const user = {
    id: getUUID(),
    name: '',
    type: '',
    image: '',
    prizeCounts: 0
  };

  tableData.push(user);
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
  localService.userInfo = tableData;
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

/**
 * 图片剪裁完毕时处理
 *
 * @param {string} data 图片数据
 * @returns {void}
 */
const onImageUploaded = (data: string): void => {
  currentUser.image = data;
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

.avatar {
  cursor: pointer;
}
</style>
