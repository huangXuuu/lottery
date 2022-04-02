<template>
  <div class="pageHead">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item :index="MenuItem.LOTTERY">
        <el-icon>
          <magic-stick />
        </el-icon>
        <span>抽奖</span>
      </el-menu-item>
      <el-menu-item :index="MenuItem.PERSON">
        <el-icon>
          <avatar />
        </el-icon>
        <span>人员配置</span>
      </el-menu-item>
      <el-menu-item :index="MenuItem.PRIZE">
        <el-icon>
          <shopping-bag />
        </el-icon>
        <span>奖项配置</span>
      </el-menu-item>
      <el-menu-item :index="MenuItem.HISTORY">
        <el-icon>
          <collection />
        </el-icon>
        <span>获奖记录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="PageHeader">
import { MagicStick, Avatar, ShoppingBag, Collection } from '@element-plus/icons-vue';

import { MenuItem } from '@/commons/constants';
import router from '@/router';

/**
 * 当前激活的菜单项
 */
const activeIndex = ref(MenuItem.LOTTERY);

/**
 * 菜单点击后处理
 *
 * @param {key} key 菜单项的key
 * @returns {void}
 */
const handleSelect = (key: string): void => {
  router.push(key);
};
</script>
