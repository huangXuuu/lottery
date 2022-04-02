/**
 * 弹框状态
 *
 * @constant
 */
export const dialogsStore = defineStore('store-dialogs', () => {
  /**
   * マスターデータ一覧
   */
  const masterData = ref<[]>([]);

  return {
    masterData
  };
});
