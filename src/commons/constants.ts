/**
 * 菜单选项
 *
 * @enum {string}
 */
export enum MenuItem {
  /**
   * 抽奖
   */
  LOTTERY = 'lottery',
  /**
   * 人员配置
   */
  PERSON = 'person',
  /**
   * 奖项配置
   */
  PRIZE = 'prize',
  /**
   * 获奖记录
   */
  HISTORY = 'history'
}

/**
 * 上传图片的最小宽高
 *
 * @readonly
 * @constant
 */
export const MinImage = {
  Width: 258,
  Height: 258
};
