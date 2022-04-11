/**
 * 人
 *
 * @interface
 */
export interface Person extends Target {
  /**
   * 头像
   */
  image: string;
}

/**
 * 奖品
 *
 * @interface
 */
export interface Prize extends Target {
  /**
   * 库存
   */
  stock: number;
}

/**
 * 抽取目标
 *
 * @interface
 */
export interface Target {
  /**
   * ID
   */
  id: string;
  /**
   * 大分类
   */
  category: string;
  /**
   * 类别
   */
  type: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 抽中次数
   */
  prizeCounts?: number;
  /**
   * 可作为目标次数
   */
  stock?: number;
}

/**
 * 抽奖配置
 *
 * @interface
 */
export interface LotteryOption {
  /**
   * 旋转轮数
   */
  round: number;
  /**
   * 奖品高度
   */
  itemHeight: number;
  /**
   * 是否显示剩余抽取次数
   */
  showLimitStock: boolean;
}
